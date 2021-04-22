const useWaves = () => {

  let start, last, dTime, demerits;
  function fpsMeasureLoop(timestamp) {
    if (start == null) {
      last = start = timestamp;
      demerits = 0;
    }
    dTime = timestamp - last;
    last = timestamp;

    // If more than 33ms since last frame (i.e. below 30fps)
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
  }

  // eslint-disable-next-line
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
  window.requestAnimationFrame(fpsMeasureLoop);
};

export default useWaves;
