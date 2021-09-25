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
	// wire the cycle buttons in the figcaption
	wireThumbCycleButtons(thumb)
	// zoom this thumb
	thumb.classList.add('zoomed')
	// thumb.removeEventListener('click', zoomThumbs)
}

const useThumbs = () => {
	const thumbs = document.querySelectorAll('.thumb')
	for (const thumb of thumbs) {
		thumb.addEventListener('click', zoomThumbs)
	}
}

// when a thumb is zoomed, we wire up the event listeners on the buttons in the caption to cycle to the next/prev image in the gallery
function wireThumbCycleButtons(thumb) {
	const prevButton = thumb.querySelector('#prev_zoom')
	const nextButton = thumb.querySelector('#next_zoom')
	prevButton.addEventListener('click', e => {
		e.preventDefault()
		const prev = thumb.previousElementSibling
		if (prev) {
			prev.click()
		} else {
			thumb.closest('.gallery').querySelector('.thumb:last-child').click()
		}
	})
	nextButton.addEventListener('click', e => {
		e.preventDefault()
		console.log('event', e)
		const next = thumb.nextElementSibling
		console.log('next', next)
		if (next) {
			next.click()
		} else {
			thumb.closest('.gallery').querySelector('.thumb:first-child').click()
		}
	})
}

export default useThumbs
