import * as Elevator from './vendor/elevator.min.js';

const elevator = () => {
  var elEl = document.querySelector('.elevator-button');
  var eb = document.getElementById('eb');

  var scrollSwitchThenElevator = function () {
    document.documentElement.style.scrollBehavior = "auto";
    eb.click();
    setTimeout(function() {
      document.documentElement.style.scrollBehavior = "smooth";
    }, 15000);
  };

  var elevator = new Elevator({
    element: eb,
    // mainAudio: '/assets/files/elevator-music.m4a',
    // endAudio: '/assets/files/Gong-sound.mp3',
    // mainAudio: '/assets/files/Elevatron.m4a',
    // endAudio: '/assets/files/Fairy.m4a',
  });

  elEl.addEventListener('click', scrollSwitchThenElevator);

  elevator.elevate();
};

export default elevator;
