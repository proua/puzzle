(function(window) {
    const TILES_COUNT = 12;
    const document = window.document;
    const imageBox = document.getElementsByClassName('image-box').item(0);
    const randomize = () => {
        let tiles = [...Array.from(document.getElementsByClassName('image-tile'))];
        while (imageBox.firstChild) {
            imageBox.removeChild(imageBox.firstChild);
        }
        console.log(tiles, imageBox);

        tiles = tiles.sort(() => Math.round(Math.random()) - 0.5);
        tiles.forEach((tile) => imageBox.appendChild(tile));
    };

    const setImages = () => {

    };

    randomize();
}(window)); 