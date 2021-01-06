import * as init from './vendor/elevator.min.js';

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

  init({
    element: eb,
  }).elevate();

  elEl.addEventListener('click', scrollSwitchThenElevator);

};

export default elevator;
