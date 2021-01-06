(function () {
  'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it;

    if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) {
      if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
        if (it) o = it;
        var i = 0;

        var F = function () {};

        return {
          s: F,
          n: function () {
            if (i >= o.length) return {
              done: true
            };
            return {
              done: false,
              value: o[i++]
            };
          },
          e: function (e) {
            throw e;
          },
          f: F
        };
      }

      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    var normalCompletion = true,
        didErr = false,
        err;
    return {
      s: function () {
        it = o[Symbol.iterator]();
      },
      n: function () {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function (e) {
        didErr = true;
        err = e;
      },
      f: function () {
        try {
          if (!normalCompletion && it.return != null) it.return();
        } finally {
          if (didErr) throw err;
        }
      }
    };
  }

  // provide hideJob wiring function
  function hideJob(e) {
    var closeTarget = e.target.dataset.closer; // find the modal to close matching this data attr

    var closingModal = document.body.querySelector('[data-modal=' + closeTarget + ']');

    if (typeof closingModal.close === "function") {
      closingModal.close();
      document.documentElement.classList.remove("modal-open");
      e.target.removeEventListener("click", hideJob); // after removing the dialog from the DOM

      var uri = window.location.toString(); // adjust the URL params to disinclude the client param

      window.history.replaceState({}, document.title, uri.substring(0, uri.indexOf("?")));
    } else {
      console.error("No modal to hide. Maybe your browser doesn't support the Dialog API.");
    }
  } // provide showJob wiring function


  function showJob(e) {
    var triggerTarget = e.target.dataset.trigger;
    console.log("triggerTarget is", triggerTarget); // find the openingModal matching this trigger's data

    var openingModal = document.body.querySelector("[data-modal=" + triggerTarget + "]");
    console.log("openingModal is", openingModal);
    document.body.appendChild(openingModal);

    if (typeof openingModal.showModal === "function") {
      openingModal.showModal(); // let the <html> know to cushion for modality

      document.documentElement.classList.add("modal-open"); // set <ESC> key to hide modal

      document.body.addEventListener("keydown", function escapeTheModal(e) {
        if (e.key === "Escape") {
          document.documentElement.classList.remove("modal-open");
        }

        document.body.removeEventListener("keydown", escapeTheModal);
      }); // if showing openingModal, wire hider

      openingModal.querySelector(".closer").addEventListener("click", hideJob); // also adjust url search params for two-way linkability

      window.history.pushState({}, '', "?client=".concat(triggerTarget));
    } else {
      console.error("No modal to show. Maybe your browser doesn't support the Dialog API.");
    }
  }

  function useFolds() {
    var triggers = document.getElementsByClassName("trigger");

    var _iterator = _createForOfIteratorHelper(triggers),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var trigger = _step.value;
        trigger.addEventListener("click", showJob);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    var usp = new URLSearchParams(window.location.search);
    console.log('// collect the search params from the URL', usp);
    var client = usp.get('client');
    console.log('// if a client is mentioned', client);

    if (typeof client !== "undefined") {
      console.log('// and there is a client dialog in the DOM');

      if (document.getElementById(client)) {
        var triggerEvent = {
          target: {
            dataset: {
              trigger: client
            }
          }
        };
        console.log('// show the dialog corresponding to the client', triggerEvent);
        showJob(triggerEvent);
      }
    }
  }

  var thumbs = function thumbs() {
    var closeThumb = function closeThumb(e, closer) {
      var thumb = e.target;

      if (_typeof(thumb) === 'object') {
        thumb.classList.remove('zoomed');
        closer.classList.remove('shown');
        closer.removeEventListener('click', closeThumb.bind(null, e, closer));
      }
    };

    var zoomThumbs = function zoomThumbs(e) {
      var thumb = e.target;
      var closer = thumb.closest('.gallery').querySelector('.closer'); // wire closest closer to close this zoomed thumb

      closer.addEventListener('click', closeThumb.bind(null, e, closer));
      closer.classList.add('shown'); // wire <ESC> key to close this thumb

      document.body.addEventListener("keydown", function (e) {
        if (e.keyCode === 27) {
          closeThumb(e);
        }
      }); // zoom this thumb

      thumb.classList.add('zoomed');
    }; // TODO: do we need to remove these listeners under some conditions?


    var thumbs = document.querySelectorAll('.thumb');

    var _iterator = _createForOfIteratorHelper(thumbs),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var thumb = _step.value;
        thumb.addEventListener('click', zoomThumbs);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  };

  // Run after the HTML document has finished loading
  var lazyloads = function lazyloads() {
    // Get our lazy-loaded images
    var lazyImages = [].slice.call(document.querySelectorAll(".lazy")); // Do this only if IntersectionObserver is supported

    if ("IntersectionObserver" in window) {
      // Create new observer object
      var lazyImageObserver = new IntersectionObserver(function (entries) {
        // Loop through IntersectionObserverEntry objects
        entries.forEach(function (entry) {
          // Do these if the target intersects with the root
          if (entry.isIntersecting) {
            var lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      }); // Loop through and observe each image

      lazyImages.forEach(function (lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      // `document.querySelectorAll` does not work in Opera Mini
      lazyImages = document.getElementsByClassName("lazy"); // https://stackoverflow.com/questions/3871547/js-iterating-over-result-of-getelementsbyclassname-using-array-foreach

      [].forEach.call(lazyImages, function (lazyImage) {
        lazyImage.src = lazyImage.dataset.src;
        lazyImage.classList.remove("lazy");
        lazyImage.height = 'auto';
      });
    }
  };

  var waves = function waves() {
    var start, last, dTime, demerits;

    function fpsMeasureLoop(timestamp) {
      if (start == null) {
        last = start = timestamp;
        demerits = 0;
      }

      dTime = timestamp - last;
      last = timestamp; // If more than 33ms since last frame (i.e. below 30fps)

      if (dTime > 200) {
        demerits += 1;

        if (demerits > 2) {
          console.log('two second timeout');
          document.getElementById("waves").classList.remove('on');
          setTimeout(window.requestAnimationFrame(fpsMeasureLoop), 2000);
          demerits = 0;
        }
      } else {
        document.getElementById("waves").classList.add('on');
      }

      window.requestAnimationFrame(fpsMeasureLoop);
    } // eslint-disable-next-line


    VANTA.WAVES({
      el: "#waves",
      color: 0x280664,
      shininess: 32.0,
      waveHeight: 12.0,
      waveSpeed: 1.5,
      mouseControls: false,
      touchControls: false,
      zoom: 1
    });
    document.getElementById("waves").classList.add("on");
    window.requestAnimationFrame(fpsMeasureLoop);
  };

  /* eslint-disable no-sparse-arrays */
  var drawer = function drawer() {
    var knob = document.getElementById("knob");
    var dresser = document.getElementById("dresser"); // let cello = document.getElementById("cello");

    var mentality = document.getElementById("mentality");
    var correspondence = document.getElementById("correspondence");
    var vibration = document.getElementById("vibration");
    var polarity = document.getElementById("polarity");
    var rhythm = document.getElementById("rhythm");
    var causality = document.getElementById("causality");
    var chirality = document.getElementById("chirality");
    var play = document.getElementById("play_all");
    var tone = mentality.value / 10;
    var freq = correspondence.value * 15;
    var buzz = vibration.value * 42;
    var treme = polarity.value * 8;
    var stut = rhythm.value / 100;
    var gel = 100 / causality.value;
    var pitch = chirality.value * 40;
    dresser.classList.remove('hidden');
    dresser.classList.add('bob-in');
    knob.addEventListener("click", function () {
      dresser.classList.toggle("open");

      if (dresser.classList.contains("open")) {
        openDrawer();
      } else {
        closeDrawer();
      }

      return;
    });

    function openDrawer() {
      // play Powerup 57 open sound
      zzfx.apply(void 0, [,, 315, .14, .03, .24,, .63, .8,, 200,, .04,,,, .13, .62, .09]);
      wireSliders();
      hideOnClickOutside(dresser);
    }

    function closeDrawer() {
      // play Powerup 57 close sound
      zzfx.apply(void 0, [,, 115, .04, .02, .24,, .63, .8,, 200,, .04,,,, .13, .62, .05]);
      unwireSliders();
    }

    function hideOnClickOutside(element) {
      var outsideClickListener = function outsideClickListener(event) {
        if (!element.contains(event.target) && isVisible(element)) {
          // or use: event.target.closest(selector) === null
          dresser.classList.remove("open");
          removeClickListener();
        }
      };

      var removeClickListener = function removeClickListener() {
        document.removeEventListener('click', outsideClickListener);
      };

      document.addEventListener('click', outsideClickListener);
    }

    var isVisible = function isVisible(elem) {
      return !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
    }; // source (2018-03-11): https://github.com/jquery/jquery/blob/master/src/css/hiddenVisibleSelectors.js


    function wireSliders() {
      mentality.addEventListener("input", playMentalitySound);
      correspondence.addEventListener("input", playCorrespondenceSound);
      vibration.addEventListener("input", playVibrationSound);
      polarity.addEventListener("input", playPolaritySound);
      rhythm.addEventListener("input", playRhythmSound);
      causality.addEventListener("input", playCausalitySound);
      chirality.addEventListener("input", playChiralitySound);
      play.addEventListener("click", playAllSounds);
    }

    function unwireSliders() {
      mentality.removeEventListener("input", playMentalitySound);
      correspondence.removeEventListener("input", playCorrespondenceSound);
      vibration.removeEventListener("input", playVibrationSound);
      polarity.removeEventListener("input", playPolaritySound);
      rhythm.removeEventListener("input", playRhythmSound);
      causality.removeEventListener("input", playCausalitySound);
      chirality.removeEventListener("input", playChiralitySound);
      play.removeEventListener("click", playAllSounds);
    }

    function playMentalitySound() {
      /* cello.style.filter = "blur("+mentality.value/100+")" */
      zzfx.apply(void 0, [,, 1250, .06,, .04,, 2.7,, 39,,,, .5, tone]);
    }

    function playCorrespondenceSound() {
      zzfx.apply(void 0, [, .25, freq, .05, .08, .12, 1, 1.3, 7.1,,,,,,, .1, .01, .6, .06]);
    }

    function playVibrationSound() {
      zzfx.apply(void 0, [,, buzz, .01,, .4, 1, 1.93, .8,,,, .01,,,, .02, .52, .01]); // Shoot 17
    }

    function playPolaritySound() {
      zzfx.apply(void 0, [,, 7, .49, .48, .15,, .52,, 5.4, treme, .04, .02,,,,, .5, .06]);
    }

    function playRhythmSound() {
      zzfx.apply(void 0, [,, 776,, .26, .44,, .46, .9, .7,,,, .7,, stut,, .92, .05]); // Explosion 45 - Mutation 1
    }

    function playCausalitySound() {
      zzfx.apply(void 0, [,, 368,, .06, .12, 2, 1.2,,, 400, .01,,, gel,,, .9, .09]); // Pickup 46
    }

    function playChiralitySound() {
      zzfx.apply(void 0, [,, pitch, .03,, .09, 1, 2.18,, -72, 223, .02, .01,,, -0.1,,, .06]); // Blip 47 - Mutation 1
    }

    function playAllSounds() {
      playCausalitySound();
      playChiralitySound();
      playCorrespondenceSound();
      playMentalitySound();
      playPolaritySound();
      playRhythmSound();
      playVibrationSound();
    }
  }; // zome zpare zound fx

  /*!
   * Elevator.js
   *
   * MIT licensed
   * Copyright (C) 2015 Tim Holman, http://tholman.com
   */

  /*********************************************
   * Elevator.js
   *********************************************/
  var Elevator = function Elevator(options) {

    var body = null; // Scroll vars

    var animation = null;
    var duration = null; // ms

    var customDuration = false;
    var startTime = null;
    var startPosition = null;
    var endPosition = 0;
    var targetElement = null;
    var verticalPadding = null;
    var elevating = false;
    var startCallback;
    var mainAudio;
    var endAudio;
    var endCallback;
    var that = this;
    /**
     * Utils
     */
    // Thanks Mr Penner - http://robertpenner.com/easing/

    function easeInOutQuad(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return c / 2 * t * t + b;
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function extendParameters(options, defaults) {
      for (var option in defaults) {
        var t = options[option] === undefined && typeof option !== "function";

        if (t) {
          options[option] = defaults[option];
        }
      }

      return options;
    }

    function getVerticalOffset(element) {
      var verticalOffset = 0;

      while (element) {
        verticalOffset += element.offsetTop || 0;
        element = element.offsetParent;
      }

      if (verticalPadding) {
        verticalOffset = verticalOffset - verticalPadding;
      }

      return verticalOffset;
    }
    /**
     * Main
     */
    // Time is passed through requestAnimationFrame, what a world!


    function animateLoop(time) {
      if (!startTime) {
        startTime = time;
      }

      var timeSoFar = time - startTime;
      var easedPosition = easeInOutQuad(timeSoFar, startPosition, endPosition - startPosition, duration);
      window.scrollTo(0, easedPosition);

      if (timeSoFar < duration) {
        animation = requestAnimationFrame(animateLoop);
      } else {
        animationFinished();
      }
    } //            ELEVATE!
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
        return;
      }

      elevating = true;
      startPosition = document.documentElement.scrollTop || body.scrollTop;
      updateEndPosition(); // No custom duration set, so we travel at pixels per millisecond. (0.75px per ms)

      if (!customDuration) {
        duration = Math.abs(endPosition - startPosition) * 1.5;
      }

      requestAnimationFrame(animateLoop); // Start music!

      if (mainAudio) {
        mainAudio.play();
      } // play Elevatron Zounds


      zzfx.apply(void 0, [, .2, 440, .4, .3, 2, 3, 1.2, 1, .4, -69, .06, .01, .3, -0.1,, .15, .59, .8]); // Elevatron

      if (startCallback) {
        startCallback();
      }
    };

    function browserMeetsRequirements() {
      return window.requestAnimationFrame && window.Audio && window.addEventListener;
    }

    function resetPositions() {
      startTime = null;
      startPosition = null;
      elevating = false;
    }

    function updateEndPosition() {
      if (targetElement) {
        endPosition = getVerticalOffset(targetElement);
      }
    }

    function animationFinished() {
      resetPositions(); // Stop music!

      if (mainAudio) {
        mainAudio.pause();
        mainAudio.currentTime = 0;
      }

      if (endAudio) {
        endAudio.play();
      } // play Fairy Zoundz


      zzfx.apply(void 0, [, .123, 815, .874, .97, .72,, .1, .2, .17, 217, .04, .03,,,,,, .44]); // Fairy

      if (endCallback) {
        endCallback();
      }
    }

    function onWindowBlur() {
      // If animating, go straight to the top. And play no more music.
      if (elevating) {
        cancelAnimationFrame(animation);
        resetPositions();

        if (mainAudio) {
          mainAudio.pause();
          mainAudio.currentTime = 0;
        }

        updateEndPosition();
        window.scrollTo(0, endPosition);
      }
    }

    function bindElevateToElement(element) {
      if (element.addEventListener) {
        element.addEventListener("click", that.elevate, false);
      } else {
        // Older browsers
        element.attachEvent("onclick", function () {
          updateEndPosition();
          document.documentElement.scrollTop = endPosition;
          document.body.scrollTop = endPosition;
          window.scroll(0, endPosition);
        });
      }
    }

    function init(_options) {
      // Take the stairs instead
      if (!browserMeetsRequirements()) {
        return;
      } // Bind to element click event.


      body = document.body;
      var defaults = {
        duration: undefined,
        mainAudio: false,
        endAudio: false,
        preloadAudio: true,
        loopAudio: true,
        startCallback: null,
        endCallback: null
      };
      _options = extendParameters(_options, defaults);

      if (_options.element) {
        bindElevateToElement(_options.element);
      }

      if (_options.duration) {
        customDuration = true;
        duration = _options.duration;
      }

      if (_options.targetElement) {
        targetElement = _options.targetElement;
      }

      if (_options.verticalPadding) {
        verticalPadding = _options.verticalPadding;
      }

      window.addEventListener("blur", onWindowBlur, false);

      if (_options.mainAudio) {
        mainAudio = new Audio(_options.mainAudio);
        mainAudio.setAttribute("preload", _options.preloadAudio);
        mainAudio.setAttribute("loop", _options.loopAudio);
      }

      if (_options.endAudio) {
        endAudio = new Audio(_options.endAudio);
        endAudio.setAttribute("preload", "true");
      }

      if (_options.endCallback) {
        endCallback = _options.endCallback;
      }

      if (_options.startCallback) {
        startCallback = _options.startCallback;
      }
    }

    init(options);
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Elevator;
  }

  var initElevator = /*#__PURE__*/Object.freeze({
    __proto__: null
  });

  var elevator = function elevator() {
    var elEl = document.querySelector('.elevator-button');
    var eb = document.getElementById('eb');

    var scrollSwitchThenElevator = function scrollSwitchThenElevator() {
      document.documentElement.style.scrollBehavior = "auto";
      eb.click();
      setTimeout(function () {
        document.documentElement.style.scrollBehavior = "smooth";
      }, 15000);
    };

    var elevator = initElevator({
      element: eb
    });
    elEl.addEventListener('click', scrollSwitchThenElevator);
    elevator.elevate();
  };

  var lenses = function lenses() {
    document.getElementById("filter_ctrl").addEventListener("change", applyFilter);

    function applyFilter(e) {
      var fltr = e.target.value;
      if (!fltr) return false;
      var celloEl = document.getElementById("cello");
      var appliedFilters = celloEl.classList; // make sure it's a new filter

      if (appliedFilters.contains(fltr)) return true;
      var filterCtrl = document.getElementById("filter_ctrl");
      filterCtrl.value = fltr; // keep select in sync

      celloEl.classList.add(fltr); // apply the new filter

      for (var _i = 0, _arr = _toConsumableArray(celloEl.classList); _i < _arr.length; _i++) {
        var x = _arr[_i];

        if (x !== "cello" && x !== fltr) {
          celloEl.classList.remove(x); // apply the new filter
        }
      }
    }
  };

  document.addEventListener("DOMContentLoaded", function () {
    useFolds();
    thumbs();
    lazyloads();
    waves();
    drawer();
    elevator();
    lenses();
  });

}());
