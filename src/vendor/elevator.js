/*!
 * Elevator.js
 *
 * MIT licensed
 * Copyright (C) 2015 Tim Holman, http://tholman.com
 */

/*********************************************
 * Elevator.js
 *********************************************/
// import {zzfx} from 'zzfx'
function Elevator(options) {
	'use strict'

	// Elements
	var body = null

	// Scroll vars
	var animation = null
	var duration = null // ms
	var customDuration = false
	var startTime = null
	var startPosition = null
	var endPosition = 0
	var targetElement = null
	var verticalPadding = null
	var elevating = false

	var startCallback
	var mainAudio
	var endAudio
	var endCallback

	var that = this

	/**
	 * Utils
	 */

	// Thanks Mr Penner - http://robertpenner.com/easing/
	function easeInOutQuad(t, b, c, d) {
		t /= d / 2
		if (t < 1) return (c / 2) * t * t + b
		t--
		return (-c / 2) * (t * (t - 2) - 1) + b
	}

	function extendParameters(options, defaults) {
		for (var option in defaults) {
			var t = options[option] === undefined && typeof option !== 'function'
			if (t) {
				options[option] = defaults[option]
			}
		}
		return options
	}

	function getVerticalOffset(element) {
		var verticalOffset = 0
		while (element) {
			verticalOffset += element.offsetTop || 0
			element = element.offsetParent
		}

		if (verticalPadding) {
			verticalOffset = verticalOffset - verticalPadding
		}

		return verticalOffset
	}

	/**
	 * Main
	 */

	// Time is passed through requestAnimationFrame, what a world!
	function animateLoop(time) {
		if (!startTime) {
			startTime = time
		}

		var timeSoFar = time - startTime
		var easedPosition = easeInOutQuad(
			timeSoFar,
			startPosition,
			endPosition - startPosition,
			duration
		)

		window.scrollTo(0, easedPosition)

		if (timeSoFar < duration) {
			animation = requestAnimationFrame(animateLoop)
		} else {
			animationFinished()
		}
	}

	//            ELEVATE!
	//              /
	//         ____
	//       .'    '=====<0
	//       |======|
	//       |======|
	//       [IIIIII[\--()
	//       |_______|
	//       C O O O D
	//      C O  O  O D
	//     C  O  O  O  D
	//     C__O__O__O__D
	//    [_____________]
	this.elevate = function () {
		if (elevating) {
			return
		}

		elevating = true
		startPosition = document.documentElement.scrollTop || body.scrollTop
		updateEndPosition()

		// No custom duration set, so we travel at pixels per millisecond. (0.75px per ms)
		if (!customDuration) {
			duration = Math.abs(endPosition - startPosition) * 1.5
		}

		requestAnimationFrame(animateLoop)

		// Start music!
		if (mainAudio) {
			mainAudio.play()
		}
		// play Elevatron Zounds
		zzfx(
			...[, 0.2, 440, 0.4, 0.3, 2, 3, 1.2, 1, 0.4, -69, 0.06, 0.01, 0.3, -0.1, , 0.15, 0.59, 0.8]
		) // Elevatron

		if (startCallback) {
			startCallback()
		}
	}

	function browserMeetsRequirements() {
		return window.requestAnimationFrame && window.Audio && window.addEventListener
	}

	function resetPositions() {
		startTime = null
		startPosition = null
		elevating = false
	}

	function updateEndPosition() {
		if (targetElement) {
			endPosition = getVerticalOffset(targetElement)
		}
	}

	function animationFinished() {
		resetPositions()

		// Stop music!
		if (mainAudio) {
			mainAudio.pause()
			mainAudio.currentTime = 0
		}

		if (endAudio) {
			endAudio.play()
		}
		// play Fairy Zoundz
		zzfx(...[, 0.123, 815, 0.874, 0.97, 0.72, , 0.1, 0.2, 0.17, 217, 0.04, 0.03, , , , , , 0.44]) // Fairy

		if (endCallback) {
			endCallback()
		}
	}

	function onWindowBlur() {
		// If animating, go straight to the top. And play no more music.
		if (elevating) {
			cancelAnimationFrame(animation)
			resetPositions()

			if (mainAudio) {
				mainAudio.pause()
				mainAudio.currentTime = 0
			}

			updateEndPosition()
			window.scrollTo(0, endPosition)
		}
	}

	function bindElevateToElement(element) {
		if (element.addEventListener) {
			element.addEventListener('click', that.elevate, false)
		} else {
			// Older browsers
			element.attachEvent('onclick', function () {
				updateEndPosition()
				document.documentElement.scrollTop = endPosition
				document.body.scrollTop = endPosition
				window.scroll(0, endPosition)
			})
		}
	}

	function init(_options) {
		// Take the stairs instead
		if (!browserMeetsRequirements()) {
			return
		}

		// Bind to element click event.
		body = document.body

		var defaults = {
			duration: undefined,
			mainAudio: false,
			endAudio: false,
			preloadAudio: true,
			loopAudio: true,
			startCallback: null,
			endCallback: null,
		}

		_options = extendParameters(_options, defaults)

		if (_options.element) {
			bindElevateToElement(_options.element)
		}

		if (_options.duration) {
			customDuration = true
			duration = _options.duration
		}

		if (_options.targetElement) {
			targetElement = _options.targetElement
		}

		if (_options.verticalPadding) {
			verticalPadding = _options.verticalPadding
		}

		window.addEventListener('blur', onWindowBlur, false)

		if (_options.mainAudio) {
			mainAudio = new Audio(_options.mainAudio)
			mainAudio.setAttribute('preload', _options.preloadAudio)
			mainAudio.setAttribute('loop', _options.loopAudio)
		}

		if (_options.endAudio) {
			endAudio = new Audio(_options.endAudio)
			endAudio.setAttribute('preload', 'true')
		}

		if (_options.endCallback) {
			endCallback = _options.endCallback
		}

		if (_options.startCallback) {
			startCallback = _options.startCallback
		}
	}

	init(options)
}

export default Elevator
