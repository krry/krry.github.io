import Elevator from './vendor/elevator.min.js';

const useElevator = () => {
  var elEl = document.querySelector('.elevator-button');
  var eb = document.getElementById('eb');

  var scrollSwitchThenElevator = function () {
    document.documentElement.style.scrollBehavior = "auto";
    eb.click();
    setTimeout(function() {
      document.documentElement.style.scrollBehavior = "smooth";
    }, 15000);
  };

  /* eslint-disable @babel/new-cap */
  const elevatorObj = new Elevator({
    element: eb,
  }).elevate();

  elEl.addEventListener('click', scrollSwitchThenElevator);

  return {
    elevatorObj
  };
};

export default useElevator;
