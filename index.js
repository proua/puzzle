(function(window) {
    const TILES_COUNT = 12;
    const document = window.document;
    const imageBox = document.querySelector('.image-box');
    const timerBox = document.querySelector('.timer-box');
    const image = document.querySelector('.image');
    const container = document.querySelector('.container');
    const countdown = document.querySelector('.countdown');

    let shiftX;
    let shiftY;
    let tiles = [];
    let transform;
    let index;

    const setTiles = () => {
        let transforms = [
            { transform: 'transform: translate(0px, 0px);' },
            { transform: 'transform: translate(320px, 0px);' },
            { transform: 'transform: translate(640px, 0px);' },
            { transform: 'transform: translate(960px, 0px);' },
            { transform: 'transform: translate(0px, 240px);' },
            { transform: 'transform: translate(320px, 240px);' },
            { transform: 'transform: translate(640px, 240px);' },
            { transform: 'transform: translate(960px, 240px);' },
            { transform: 'transform: translate(0px, 480px);' },
            { transform: 'transform: translate(320px, 480px);' },
            { transform: 'transform: translate(640px, 480px);' },
            { transform: 'transform: translate(960px, 480px);' }
        ];
        transforms.forEach((element, index) => element.index = index);
        transforms = transforms.sort(() => Math.round(Math.random()) - 0.5);

        const styles = [
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 0% 0%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 33.3% 0%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 66.6% 0%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 100% 0%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 0% 50%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 33.3% 50%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 66.6% 50%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 100% 50%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 0% 100%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 33.3% 100%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 66.6% 100%; width: 320px; height: 240px;',
            'background-image: url(banner-landscape.jpg); background-size: 400%; background-position: 100% 100%; width: 320px; height: 240px;'
        ];
        styles.forEach((style, index) => {
            const element = document.createElement('div');
            element.setAttribute('data-value', index);
            element.setAttribute('index', transforms[index].index);
            element.setAttribute('class', 'image-tile');
            element.setAttribute('style', style + transforms[index].transform);
            element.addEventListener('touchmove', handleTouchMove, false);
            element.addEventListener('touchend', handleTouchEnd, false);
            element.addEventListener('touchstart', handleTouchStart, false);
            element.addEventListener('touchcancel', handleTouchCancel, false);
            tiles.push(element);
        });
    };

    const handleTouchStart = (event) => {
        event.preventDefault();

        transform = event.srcElement.style.transform;
        index = parseInt(event.srcElement.getAttribute('index'));
        shiftX = event.touches[0].pageX - getCoords(event.srcElement).left;
        shiftY = event.touches[0].pageY - getCoords(event.srcElement).top;
        event.srcElement.style.transform = `translate(${event.touches[0].pageX - shiftX}px, ${event.touches[0].pageY - shiftY}px)`;
        debugger;
        event.srcElement.style.zIndex = 1000;
    };

    const handleTouchCancel = (event) => {
        event.srcElement.style.transform = transform;
    };

    const getCoords = (elem) => {
        var box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }

    const handleTouchMove = (event) => {
        event.preventDefault();
        event.srcElement.style.transform = `translate(${event.touches[0].pageX - shiftX}px, ${event.touches[0].pageY - shiftY}px)`;
    };

    const handleTouchEnd = (event) => {
        if (typeof event !== 'object' || !event.srcElement) {
            return;
        }

        event.preventDefault();

        const location = event.changedTouches[0];
        const left = location.clientX;
        const top = location.clientY;
        event.srcElement.hidden = true;

        const destinationElement = document.elementFromPoint(left, top);
        const reset = () => {
            event.srcElement.style.transform = transform;
            event.srcElement.hidden = false;

            return;
        };
        if (!destinationElement) {
            return reset();
        }

        const closestTile = destinationElement.closest('.image-tile');
        if (!closestTile) {
            return reset();
        }

        event.srcElement.hidden = false;
        event.srcElement.style.position = null;

        event.srcElement.style.transform = closestTile.style.transform;
        destinationElement.style.transform = transform;
        event.srcElement.style.zIndex = null;
        event.srcElement.setAttribute('index', destinationElement.getAttribute('index'));
        destinationElement.setAttribute('index', index);
    };

    const renderTiles = () => {
        let fragment = document.createDocumentFragment();

        tiles.forEach((tile) => {
            fragment.appendChild(tile);
        });
        imageBox.appendChild(fragment);
    };

    let counter = 4;
    const interval = setInterval(() => {
        counter--;
        countdown.classList.remove('transition');
        countdown.innerHTML = counter;
        setTimeout(() => {
            countdown.classList.add('transition');

        }, 100);
        if (counter === 0) {
            clearInterval(interval);
            container.removeChild(image);

            imageBox.classList.remove('display-none');

            setTiles();
            renderTiles();
            timerBox.classList.remove('display-none');

            setTimeout(() => {
                let gameCounter = 21;
                const progress = document.querySelector('.progress');
                progress.style.animationDuration = '21s'; 
                progress.classList.add('animate');
                document.querySelector('.game-countdown').innerHTML = gameCounter;

                const gameInterval = setInterval(() => {
                    gameCounter--;
                    document.querySelector('.game-countdown').innerHTML = gameCounter;
                    const isCorrectOrder = Array.from(imageBox.getElementsByClassName('image-tile'))
                        .every((tile) => parseInt(tile.getAttribute('index')) === parseInt(tile.getAttribute('data-value')));
                    if (gameCounter === 0 || isCorrectOrder) {
                        removeEventListeners();
                        clearInterval(gameInterval);
                    }
                }, 1000);
            }, 2000);
        }
    }, 1000);

    const removeEventListeners = () => {
        tiles.forEach((tile) => {
            tile.removeEventListener('touchmove', handleTouchMove, false);
            tile.removeEventListener('touchend', handleTouchEnd, false);
            tile.removeEventListener('touchstart', handleTouchStart, false);
            tile.removeEventListener('touchcancel', handleTouchCancel, false);
        });
    };
}(window)); 
