/* eslint-disable no-sparse-arrays */
import {zzfx} from 'zzfx'

const useDrawer = () => {
	let knob = document.getElementById('knob')
	let dresser = document.getElementById('dresser')
	// let cello = document.getElementById("cello");

	let mentality = document.getElementById('mentality')
	let correspondence = document.getElementById('correspondence')
	let vibration = document.getElementById('vibration')
	let polarity = document.getElementById('polarity')
	let rhythm = document.getElementById('rhythm')
	let causality = document.getElementById('causality')
	let chirality = document.getElementById('chirality')
	let play = document.getElementById('play_all')

	let tone = mentality.value / 10
	let freq = correspondence.value * 15
	let buzz = vibration.value * 42
	let treme = polarity.value * 8
	let stut = rhythm.value / 100
	let gel = 100 / causality.value
	let pitch = chirality.value * 40

	dresser.classList.remove('hidden')
	dresser.classList.add('bob-in')

	knob.addEventListener('click', function () {
		dresser.classList.toggle('open')
		if (dresser.classList.contains('open')) {
			openDrawer()
		} else {
			closeDrawer()
		}
		return
	})

	function openDrawer() {
		// play Powerup 57 open sound
		zzfx(...[, , 315, 0.14, 0.03, 0.24, , 0.63, 0.8, , 200, , 0.04, , , , 0.13, 0.62, 0.09])
		wireSliders()
		hideOnClickOutside(dresser)
	}

	function closeDrawer() {
		// play Powerup 57 close sound
		zzfx(...[, , 115, 0.04, 0.02, 0.24, , 0.63, 0.8, , 200, , 0.04, , , , 0.13, 0.62, 0.05])
		unwireSliders()
	}

	function hideOnClickOutside(element) {
		const outsideClickListener = event => {
			if (!element.contains(event.target) && isVisible(element)) {
				// or use: event.target.closest(selector) === null
				dresser.classList.remove('open')
				removeClickListener()
			}
		}

		const removeClickListener = () => {
			document.removeEventListener('click', outsideClickListener)
		}

		document.addEventListener('click', outsideClickListener)
	}

	const isVisible = elem =>
		!!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length) // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js

	function wireSliders() {
		mentality.addEventListener('input', playMentalitySound)
		correspondence.addEventListener('input', playCorrespondenceSound)
		vibration.addEventListener('input', playVibrationSound)
		polarity.addEventListener('input', playPolaritySound)
		rhythm.addEventListener('input', playRhythmSound)
		causality.addEventListener('input', playCausalitySound)
		chirality.addEventListener('input', playChiralitySound)
		play.addEventListener('click', playAllSounds)
	}

	function unwireSliders() {
		mentality.removeEventListener('input', playMentalitySound)
		correspondence.removeEventListener('input', playCorrespondenceSound)
		vibration.removeEventListener('input', playVibrationSound)
		polarity.removeEventListener('input', playPolaritySound)
		rhythm.removeEventListener('input', playRhythmSound)
		causality.removeEventListener('input', playCausalitySound)
		chirality.removeEventListener('input', playChiralitySound)
		play.removeEventListener('click', playAllSounds)
	}

	function playMentalitySound() {
		/* cello.style.filter = "blur("+mentality.value/100+")" */
		zzfx(...[, , 1250, 0.06, , 0.04, , 2.7, , 39, , , , 0.5, tone])
	}

	function playCorrespondenceSound() {
		zzfx(...[, 0.25, freq, 0.05, 0.08, 0.12, 1, 1.3, 7.1, , , , , , , 0.1, 0.01, 0.6, 0.06])
	}

	function playVibrationSound() {
		zzfx(...[, , buzz, 0.01, , 0.4, 1, 1.93, 0.8, , , , 0.01, , , , 0.02, 0.52, 0.01])
		// Shoot 17
	}

	function playPolaritySound() {
		zzfx(...[, , 7, 0.49, 0.48, 0.15, , 0.52, , 5.4, treme, 0.04, 0.02, , , , , 0.5, 0.06])
	}

	function playRhythmSound() {
		zzfx(...[, , 776, , 0.26, 0.44, , 0.46, 0.9, 0.7, , , , 0.7, , stut, , 0.92, 0.05])
		// Explosion 45 - Mutation 1
	}

	function playCausalitySound() {
		zzfx(...[, , 368, , 0.06, 0.12, 2, 1.2, , , 400, 0.01, , , gel, , , 0.9, 0.09])
		// Pickup 46
	}

	function playChiralitySound() {
		zzfx(...[, , pitch, 0.03, , 0.09, 1, 2.18, , -72, 223, 0.02, 0.01, , , -0.1, , , 0.06])
		// Blip 47 - Mutation 1
	}

	function playAllSounds() {
		playCausalitySound()
		playChiralitySound()
		playCorrespondenceSound()
		playMentalitySound()
		playPolaritySound()
		playRhythmSound()
		playVibrationSound()
	}
}

// zome zpare zound fx
// zzfx(...[,.2,440,.4,.3,2,3,1.2,1,.4,-69,.06,.01,.3,-0.1,,.15,.59,.8]); // Elevatron
// zzfx(...[,.123,815,.874,.97,.72,,.1,.2,.17,217,.04,.03,,,,,,.44]); // Fairy
// zzfx(...[,,69,.06,.21,.39,2,,4.2,,,,.01,,-1.6,,.15,2.7,.47]); // Jump 34

export default useDrawer
