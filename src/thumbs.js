const thumbs = () => {
    let closeThumb = function (e, closer) {
        let thumb = e.target;
        if (typeof thumb === 'object') {
            thumb.classList.remove('zoomed');
            closer.classList.remove('shown');
            closer.removeEventListener('click', closeThumb.bind(null, e, closer));
        }
    };

    let zoomThumbs = function (e) {
        let thumb = e.target;
        let closer = thumb.closest('.gallery').querySelector('.closer');
        // wire closest closer to close this zoomed thumb
        closer.addEventListener('click', closeThumb.bind(null, e, closer));
        closer.classList.add('shown');
        // wire <ESC> key to close this thumb
        document.body.addEventListener("keydown", (e) => {if (e.keyCode === 27) {closeThumb(e);}});
        // zoom this thumb
        thumb.classList.add('zoomed');
    };
    // TODO: do we need to remove these listeners under some conditions?
    let thumbs = document.querySelectorAll('.thumb');
    for (const thumb of thumbs) {
        thumb.addEventListener('click', zoomThumbs);
    }
};

export default thumbs;
