function closeThumb(e, closer) {
	const thumb = e.target
	if (typeof thumb === 'object') {
		thumb.classList.remove('zoomed')
		closer.classList.remove('shown')
		closer.removeEventListener('click', closeThumb.bind(null, e, closer))
	}
}

function zoomThumbs(e) {
	const thumb = e.target
	const closer = thumb.closest('.gallery').querySelector('.closer')
	// wire closest closer to close this zoomed thumb
	closer.addEventListener('click', closeThumb.bind(null, e, closer))
	closer.classList.add('shown')
	// wire <ESC> key to close this thumb
	document.body.addEventListener('keydown', e => {
		if (e.keyCode === 27) {
			closeThumb(e)
		}
	})
	// zoom this thumb
	thumb.classList.add('zoomed')
}

const useThumbs = () => {
	// TODO: do we need to remove these listeners under some conditions?
	const thumbs = document.querySelectorAll('.thumb')
	for (const thumb of thumbs) {
		thumb.addEventListener('click', zoomThumbs)
	}
}

export default useThumbs
