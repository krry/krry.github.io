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

var scrollPosition;

function jumpBackToPrevPos() {
  document.documentElement.style.scrollBehavior = 'auto'; // return the document to its previous scroll point

  console.log('resuming scrollPosition', scrollPosition);
  document.documentElement.scrollTop = scrollPosition;
  document.documentElement.style.scrollBehavior = 'smooth';
}

function adjustUrlWithModal() {
  // after removing the dialog from the DOM
  var uri = window.location.toString(); // adjust the URL params to disinclude the project param

  window.history.replaceState({}, document.title, uri.substring(0, uri.indexOf('?')));
} // provide hideJob wiring function


function hideJob(e) {
  var closeTarget = e.target.dataset.closer; // find the modal to close matching this data attr

  var closingModal = document.body.querySelector('[data-modal=' + closeTarget + ']');

  if (typeof closingModal.close === 'function') {
    e.target.removeEventListener('click', hideJob);
    closeModal(closingModal);
  } else {
    console.error("No modal to hide. Maybe your browser doesn't support the Dialog API.");
  }
}

function closeModal(target) {
  target.close();
  document.documentElement.classList.remove('modal-open');
  jumpBackToPrevPos();
  adjustUrlWithModal();
} // provide showJob wiring function


function showJob(e) {
  var triggerTarget = e.target.dataset.trigger; // console.log("triggerTarget is", triggerTarget);
  // find the openingModal matching this trigger's data

  var openingModal = document.body.querySelector('[data-modal=' + triggerTarget + ']'); // console.log("openingModal is", openingModal);

  document.body.appendChild(openingModal);
  scrollPosition = document.documentElement.scrollTop;
  console.log('preserving scrollPosition', scrollPosition);

  if (typeof openingModal.showModal === 'function') {
    openingModal.showModal(); // let the <html> know to cushion for modality

    document.documentElement.classList.add('modal-open'); // start at the top of the job modal

    document.getElementById(triggerTarget).scrollTop = 0; // set <ESC> key to hide modal

    document.body.addEventListener('keydown', function escapeTheModal(e) {
      if (e.key === 'Escape') {
        closeModal(openingModal);
      }

      document.body.removeEventListener('keydown', escapeTheModal);
    }); // if showing openingModal, wire hider

    openingModal.querySelector('.closer').addEventListener('click', hideJob); // also adjust url search params for two-way linkability

    window.history.pushState({}, '', "?project=".concat(triggerTarget));
  } else {
    console.error("No modal to show. Maybe your browser doesn't support the Dialog API.");
  }
}

function useFolds() {
  var triggers = document.getElementsByClassName('trigger');

  var _iterator = _createForOfIteratorHelper(triggers),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var trigger = _step.value;
      trigger.addEventListener('click', showJob);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var usp = new URLSearchParams(window.location.search); // console.log('// collect the search params from the URL', usp);

  var project = usp.get('project'); // console.log('// if a project is mentioned', project);

  if (typeof project !== 'undefined') {
    // console.log('// and there is a project dialog in the DOM');
    if (document.getElementById(project)) {
      var triggerEvent = {
        target: {
          dataset: {
            trigger: project
          }
        }
      }; // console.log('// show the dialog corresponding to the project', triggerEvent);

      showJob(triggerEvent);
    }
  }
}

function closeThumb(e, closer) {
  var thumb = e.target;

  if (_typeof(thumb) === 'object') {
    thumb.classList.remove('zoomed');
    closer.classList.remove('shown');
    closer.removeEventListener('click', closeThumb.bind(null, e, closer));
  }
}

function zoomThumbs(e) {
  var thumb = e.target;
  var closer = thumb.closest('.gallery').querySelector('.closer'); // wire closest closer to close this zoomed thumb

  closer.addEventListener('click', closeThumb.bind(null, e, closer));
  closer.classList.add('shown'); // wire <ESC> key to close this thumb

  document.body.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      closeThumb(e);
    }
  }); // zoom this thumb

  thumb.classList.add('zoomed');
  thumb.removeEventListener('click', zoomThumbs);
}

var useThumbs = function useThumbs() {
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
var useLazyloads = function useLazyloads() {
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

var useWaves = function useWaves() {
  var start, last, dTime, demerits;

  function fpsMeasureLoop(timestamp) {
    if (start == null) {
      last = start = timestamp;
      demerits = 0;
    }

    dTime = timestamp - last;
    last = timestamp; // If more than 33ms since last frame (i.e. below 30fps)

    if (dTime > 100) {
      demerits += 1;

      if (demerits > 2) {
        console.log('two second timeout');
        document.getElementById('waves').classList.remove('on');
        setTimeout(window.requestAnimationFrame(fpsMeasureLoop), 2000);
        demerits = 0;
      }
    } else {
      document.getElementById('waves').classList.add('on');
    }

    window.requestAnimationFrame(fpsMeasureLoop);
  } // eslint-disable-next-line


  VANTA.WAVES({
    el: '#waves',
    color: 0x280664,
    shininess: 32.0,
    waveHeight: 12.0,
    waveSpeed: 1.5,
    mouseControls: false,
    touchControls: false,
    zoom: 1
  });
  document.getElementById('waves').classList.add('on');
  window.requestAnimationFrame(fpsMeasureLoop);
};

/* eslint-disable no-sparse-arrays */
var useDrawer = function useDrawer() {
  var knob = document.getElementById('knob');
  var dresser = document.getElementById('dresser'); // let cello = document.getElementById("cello");

  var mentality = document.getElementById('mentality');
  var correspondence = document.getElementById('correspondence');
  var vibration = document.getElementById('vibration');
  var polarity = document.getElementById('polarity');
  var rhythm = document.getElementById('rhythm');
  var causality = document.getElementById('causality');
  var chirality = document.getElementById('chirality');
  var play = document.getElementById('play_all');
  var tone = mentality.value / 10;
  var freq = correspondence.value * 15;
  var buzz = vibration.value * 42;
  var treme = polarity.value * 8;
  var stut = rhythm.value / 100;
  var gel = 100 / causality.value;
  var pitch = chirality.value * 40;
  dresser.classList.remove('hidden');
  dresser.classList.add('bob-in');
  knob.addEventListener('click', function () {
    dresser.classList.toggle('open');

    if (dresser.classList.contains('open')) {
      openDrawer();
    } else {
      closeDrawer();
    }

    return;
  });

  function openDrawer() {
    // play Powerup 57 open sound
    zzfx.apply(void 0, [,, 315, 0.14, 0.03, 0.24,, 0.63, 0.8,, 200,, 0.04,,,, 0.13, 0.62, 0.09]);
    wireSliders();
    hideOnClickOutside(dresser);
  }

  function closeDrawer() {
    // play Powerup 57 close sound
    zzfx.apply(void 0, [,, 115, 0.04, 0.02, 0.24,, 0.63, 0.8,, 200,, 0.04,,,, 0.13, 0.62, 0.05]);
    unwireSliders();
  }

  function hideOnClickOutside(element) {
    var outsideClickListener = function outsideClickListener(event) {
      if (!element.contains(event.target) && isVisible(element)) {
        // or use: event.target.closest(selector) === null
        dresser.classList.remove('open');
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
    mentality.addEventListener('input', playMentalitySound);
    correspondence.addEventListener('input', playCorrespondenceSound);
    vibration.addEventListener('input', playVibrationSound);
    polarity.addEventListener('input', playPolaritySound);
    rhythm.addEventListener('input', playRhythmSound);
    causality.addEventListener('input', playCausalitySound);
    chirality.addEventListener('input', playChiralitySound);
    play.addEventListener('click', playAllSounds);
  }

  function unwireSliders() {
    mentality.removeEventListener('input', playMentalitySound);
    correspondence.removeEventListener('input', playCorrespondenceSound);
    vibration.removeEventListener('input', playVibrationSound);
    polarity.removeEventListener('input', playPolaritySound);
    rhythm.removeEventListener('input', playRhythmSound);
    causality.removeEventListener('input', playCausalitySound);
    chirality.removeEventListener('input', playChiralitySound);
    play.removeEventListener('click', playAllSounds);
  }

  function playMentalitySound() {
    /* cello.style.filter = "blur("+mentality.value/100+")" */
    zzfx.apply(void 0, [,, 1250, 0.06,, 0.04,, 2.7,, 39,,,, 0.5, tone]);
  }

  function playCorrespondenceSound() {
    zzfx.apply(void 0, [, 0.25, freq, 0.05, 0.08, 0.12, 1, 1.3, 7.1,,,,,,, 0.1, 0.01, 0.6, 0.06]);
  }

  function playVibrationSound() {
    zzfx.apply(void 0, [,, buzz, 0.01,, 0.4, 1, 1.93, 0.8,,,, 0.01,,,, 0.02, 0.52, 0.01]); // Shoot 17
  }

  function playPolaritySound() {
    zzfx.apply(void 0, [,, 7, 0.49, 0.48, 0.15,, 0.52,, 5.4, treme, 0.04, 0.02,,,,, 0.5, 0.06]);
  }

  function playRhythmSound() {
    zzfx.apply(void 0, [,, 776,, 0.26, 0.44,, 0.46, 0.9, 0.7,,,, 0.7,, stut,, 0.92, 0.05]); // Explosion 45 - Mutation 1
  }

  function playCausalitySound() {
    zzfx.apply(void 0, [,, 368,, 0.06, 0.12, 2, 1.2,,, 400, 0.01,,, gel,,, 0.9, 0.09]); // Pickup 46
  }

  function playChiralitySound() {
    zzfx.apply(void 0, [,, pitch, 0.03,, 0.09, 1, 2.18,, -72, 223, 0.02, 0.01,,, -0.1,,, 0.06]); // Blip 47 - Mutation 1
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

// import Elevator from './vendor/elevator.js';
var useElevator = function useElevator() {
  var elEl = document.querySelector('.elevator-button'); // var eb = document.getElementById('eb');

  var scrollSwitchThenElevator = function scrollSwitchThenElevator() {
    // document.documentElement.style.scrollBehavior = "auto";
    // eb.click();
    // setTimeout(function() {
    //   document.documentElement.style.scrollBehavior = "smooth";
    // }, 15000);
    document.documentElement.scrollTop = 0;
  };
  /* eslint-disable @babel/new-cap */
  // const elevatorObj = new Elevator({
  //   element: eb,
  // }).elevate();


  elEl.addEventListener('click', scrollSwitchThenElevator); // return {
  //   elevatorObj
  // };
};

function applyFilter(e) {
  var fltr = e.target.value;
  if (!fltr) return;
  console.log('// applying filter', e.target.value);
  var celloEl = document.getElementById('cello');
  var appliedFilters = celloEl.classList; // make sure it's a new filter

  if (appliedFilters.contains(fltr)) return true;
  var filterCtrl = document.getElementById('filter_ctrl');
  filterCtrl.value = fltr; // keep select in sync

  celloEl.classList.add(fltr); // apply the new filter

  for (var _i = 0, _arr = _toConsumableArray(celloEl.classList); _i < _arr.length; _i++) {
    var x = _arr[_i];

    if (x !== 'cello' && x !== fltr) {
      celloEl.classList.remove(x); // apply the new filter
    }
  }
}

var useLenses = function useLenses() {
  document.getElementById('filter_ctrl').addEventListener('change', applyFilter);
};

var hookInputSetter = function hookInputSetter(target, key) {
  var orig = Object.getOwnPropertyDescriptor(target, key);
  Object.defineProperty(target, key, {
    set: function set(value) {
      this.dispatchEvent(new Event("coherevalueupdate"));

      if (orig && orig.set) {
        orig.set.call(this, value);
      }
    }
  });
};

var disableLoad = typeof window === "undefined" || !window.document || window.document.documentMode;

if (!disableLoad) {
  hookInputSetter(HTMLInputElement.prototype, "value");
  hookInputSetter(HTMLInputElement.prototype, "checked");
  hookInputSetter(HTMLTextAreaElement.prototype, "value");
  hookInputSetter(HTMLSelectElement.prototype, "value");
  hookInputSetter(HTMLSelectElement.prototype, "selectedIndex");
}

var bridgedMethods = ["init", "identify", "stop", "showCode"];

var noop = function noop() {};

var noopModule = {
  init: noop,
  identify: noop,
  stop: noop,
  showCode: noop
}; // Create cohere or pass in previous args to init/initialize
//  if script is not created

var Cohere = disableLoad ? noopModule : window.Cohere = [];

if (!disableLoad) {
  Cohere.invoked = true;
  Cohere.snippet = "0.4";
  Cohere.valhook = true;
  Cohere.methods = bridgedMethods;
  Cohere.methods.forEach(function (method) {
    Cohere[method] = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      args.unshift(method);
      Cohere.push(args);
    };
  }); // Create an async script element based on your key

  var script = document.createElement("script");
  script.type = "text/javascript";
  script.async = true;
  script.src = "https://static.cohere.so/main.js"; // Insert our script before the first script element

  var first = document.getElementsByTagName("script")[0];

  if (first && first.parentNode) {
    first.parentNode.insertBefore(script, first);
  }
}

var exportedModule = Cohere;

var useCohere = function useCohere() {
  exportedModule.init("lUCsR9BYS7tcTYru1bB_3Qb_");
};

var playMuzak = function playMuzak() {
  var muzak = document.querySelector('#muzak');
  muzak === null || muzak === void 0 ? void 0 : muzak.addEventListener('canplaythrough', function (event) {
    /* the audio is now playable; play it if permissions allow */
    console.info('event', event);
    muzak.play();
  });
};

document.addEventListener('DOMContentLoaded', function () {
  useFolds();
  useThumbs();
  useLenses();
  useLazyloads();
  useWaves();
  useDrawer();
  useElevator();
  useCohere();
  playMuzak();
});
