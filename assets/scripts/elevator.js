document.addEventListener(("DOMContentLoaded"), function() {
  var elEl = document.querySelector('.elevator-button');
  var elevator = new Elevator({
    element: elEl,
    mainAudio: '/assets/files/elevator-music.m4a',
    endAudio: '/assets/files/Gong-sound.mp3',
  });
})
