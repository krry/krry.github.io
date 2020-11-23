document.addEventListener('DOMContentLoaded', (_) => {
  let knob = document.getElementById("knob");
  let dresser = document.getElementById("dresser");
  // let cello = document.getElementById("cello");

  let mentality = document.getElementById("mentality");
  let correspondence = document.getElementById("correspondence");
  let vibration = document.getElementById("vibration");
  let polarity = document.getElementById("polarity");
  let rhythm = document.getElementById("rhythm");
  let causality = document.getElementById("causality");
  let chirality = document.getElementById("chirality");
  let play = document.getElementById("play_all");

  let tone = mentality.value/10;
  let freq = correspondence.value*15;
  let buzz = vibration.value*42;
  let treme = polarity.value*8;
  let stut = rhythm.value/100;
  let gel = 100/causality.value;
  let pitch = chirality.value*40;

  dresser.classList.remove('hidden');
  dresser.classList.add('bob-in');

  knob.addEventListener("click", function(){
    dresser.classList.toggle("open");
    if (dresser.classList.contains("open")) {
      // play Powerup 57 open sound
      zzfx(...[,,315,.14,.03,.24,,.63,.8,,200,,.04,,,,.13,.62,.09]);
      wireSliders()
    } else {
      // play Powerup 57 close sound
      zzfx(...[,,115,.04,.02,.24,,.63,.8,,200,,.04,,,,.13,.62,.05]);
      unwireSliders()
    }
  });

  function wireSliders() {
    mentality.addEventListener("input", playMentalitySound);
    correspondence.addEventListener("input", playCorrespondenceSound);
    vibration.addEventListener("input", playVibrationSound);
    polarity.addEventListener("input", playPolaritySound);
    rhythm.addEventListener("input", playRhythmSound);
    causality.addEventListener("input", playCausalitySound);
    chirality.addEventListener("input", playChiralitySound);
    play.addEventListener("click", playAllSounds)
  }

  function unwireSliders() {
    mentality.removeEventListener("input", playMentalitySound);
    correspondence.removeEventListener("input", playCorrespondenceSound);
    vibration.removeEventListener("input", playVibrationSound);
    polarity.removeEventListener("input", playPolaritySound);
    rhythm.removeEventListener("input", playRhythmSound);
    causality.removeEventListener("input", playCausalitySound);
    chirality.removeEventListener("input", playChiralitySound);
    play.removeEventListener("click", playAllSounds)
  }

  function playMentalitySound() {
    /* cello.style.filter = "blur("+mentality.value/100+")" */
    zzfx(...[,,1250,.06,,.04,,2.7,,39,,,,.5,tone]);
  }

  function playCorrespondenceSound() {
    zzfx(...[,.25,freq,.05,.08,.12,1,1.3,7.1,,,,,,,.1,.01,.6,.06]);
  }

  function playVibrationSound() {
    zzfx(...[,,buzz,.01,,.4,1,1.93,.8,,,,.01,,,,.02,.52,.01]);
    // Shoot 17
  }

  function playPolaritySound() {
    zzfx(...[,,7,.49,.48,.15,,.52,,5.4,treme,.04,.02,,,,,.5,.06]);
  }

  function playRhythmSound() {
    zzfx(...[,,776,,.26,.44,,.46,.9,.7,,,,.7,,stut,,.92,.05]);
    // Explosion 45 - Mutation 1
  }

  function playCausalitySound() {
    zzfx(...[,,368,,.06,.12,2,1.2,,,400,.01,,,gel,,,.9,.09]);
    // Pickup 46
  }

  function playChiralitySound() {
    zzfx(...[,,pitch,.03,,.09,1,2.18,,-72,223,.02,.01,,,-0.1,,,.06]);
    // Blip 47 - Mutation 1
  }

  function playAllSounds(){
    playCausalitySound()
    playChiralitySound()
    playCorrespondenceSound()
    playMentalitySound()
    playPolaritySound()
    playRhythmSound()
    playVibrationSound()
  }
})

// zome zpare zound fx
// zzfx(...[,.2,440,.4,.3,2,3,1.2,1,.4,-69,.06,.01,.3,-0.1,,.15,.59,.8]); // Elevatron
// zzfx(...[,.123,815,.874,.97,.72,,.1,.2,.17,217,.04,.03,,,,,,.44]); // Fairy
// zzfx(...[,,69,.06,.21,.39,2,,4.2,,,,.01,,-1.6,,.15,2.7,.47]); // Jump 34
