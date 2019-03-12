(function(window) {
    const TILES_COUNT = 12;
    const document = window.document;
    const imageBox = document.getElementsByClassName('image-box').item(0);
    let tiles = [];
    let transform;

    const setTiles = () => {
        let transforms = [
            'transform: translate(0px, 0px);',
            'transform: translate(320px, 0px);',
            'transform: translate(640px, 0px);',
            'transform: translate(960px, 0px);',
            'transform: translate(0px, 240px);',
            'transform: translate(320px, 240px);',
            'transform: translate(640px, 240px);',
            'transform: translate(960px, 240px);',
            'transform: translate(0px, 480px);',
            'transform: translate(320px, 480px);',
            'transform: translate(640px, 480px);',
            'transform: translate(960px, 480px);'
        ];
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
            element.setAttribute('class', 'image-tile');
            element.setAttribute('style', style + transforms[index]);
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
    };

    const handleTouchCancel = (event) => {
        event.srcElement.style.top = null;
        event.srcElement.style.left = null;
        event.srcElement.style.transform = transform;
    };

    const handleTouchMove = (event) => {
        event.preventDefault();
    }

    const handleTouchEnd = (event) => {
        if (typeof event !== 'object' || !event.srcElement) {
            return;
        }

        event.preventDefault();

        const location = event.changedTouches[0];
        const left = location.clientX;
        const top = location.clientY;

        const destinationElement = document.elementFromPoint(left, top);
        if (!destinationElement) {
            var e = new Event('touchcancel');
            event.dispatchEvent(e);
            return;
        }
        event.srcElement.style.position = null;

        event.srcElement.style.top = null;
        event.srcElement.style.left = null;
        event.srcElement.style.transform = destinationElement.closest('.image-tile').style.transform;
        destinationElement.style.transform = transform;
    };

    const clearBox = () => {
        while (imageBox.firstChild) {
            imageBox.removeChild(imageBox.firstChild);
        }
    };

    const renderTiles = () => {
        let fragment = document.createDocumentFragment();

        tiles.forEach((tile) => {
            fragment.appendChild(tile);
        });
        imageBox.appendChild(fragment);
    };

    let counter = 3;
    const interval = setInterval(() => {
        console.log('counter', { counter });
        counter--;
        if (counter === 0) {
            clearInterval(interval);
            imageBox.classList.remove('image-box-background');
            setTiles();
            // randomize();
            renderTiles();
        }
    }, 1000);

}(window)); 