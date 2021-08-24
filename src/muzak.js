const playMuzak = () => {
	const muzak = document.querySelector('#muzak')
	muzak?.addEventListener('canplaythrough', event => {
		/* the audio is now playable; play it if permissions allow */
		console.info('event', event)
		muzak.play()
	})
}

export default playMuzak
