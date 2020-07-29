document.addEventListener("DOMContentLoaded", () => {
  var start = null;
  var last = null;
  window.requestAnimationFrame(fpsMeasureLoop);
  function fpsMeasureLoop(timestamp) {
    if (start == null) {
      last = start = timestamp;
      return;
    }
    var dTime = timestamp - last;
    if (dTime > 50) {
      // If more than 33ms since last frame (i.e. below 30fps)
      document.getElementsByTagName("body")[0].className = "paused";
    }
    window.requestAnimationFrame(fpsMeasureLoop);
  }

  VANTA.WAVES({
    el: "#waves",
    color: 0x280664,
    shininess: 32.0,
    waveHeight: 12.0,
    waveSpeed: 1.5,
    mouseControls: false,
    touchControls: false,
    zoom: 1,
  });
  document.getElementById("waves").classList.add("on");
});
