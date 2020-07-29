document.addEventListener('DOMContentLoaded', (event) => {
    let knob = document.getElementById("knob");
    let dresser = document.getElementById("dresser");
    let cello = document.getElementById("cello");

    knob.addEventListener("click", function(){
      dresser.classList.toggle("open");
      if (dresser.classList.contains("open")) {
        // play Powerup 57 open sound
        zzfx(...[,,315,.14,.03,.24,,.63,.8,,200,,.04,,,,.13,.62,.09]);
      } else {
        // play Powerup 57 close sound
        zzfx(...[,,115,.04,.02,.24,,.63,.8,,200,,.04,,,,.13,.62,.05]);
      }
    });
    let mentality = document.getElementById("mentality");
    let tone = mentality.value/10;
    mentality.addEventListener("input", function () {
        tone = mentality.value/10;
        console.log(mentality.value);
        cello.style.filter = "blur("+mentality.value/100+")"
        zzfx(...[,,1250,.06,,.04,,2.7,,39,,,,.5,tone]);
    });
    let correspondence = document.getElementById("correspondence");
    let freq = correspondence.value*15;
    correspondence.addEventListener("input", function() {
        freq = correspondence.value*15;
        zzfx(...[,.25,freq,.05,.08,.12,1,1.3,7.1,,,,,,,.1,.01,.6,.06]);
    });
    let vibration = document.getElementById("vibration");
    let buzz = vibration.value*42;
    vibration.addEventListener("input", function() {
        buzz = vibration.value*42;
        zzfx(...[,,buzz,.01,,.4,1,1.93,.8,,,,.01,,,,.02,.52,.01]); // Shoot 17
    });
    let polarity = document.getElementById("polarity");
    let treme = polarity.value*8;
    polarity.addEventListener("input", function() {
        treme = polarity.value*8;
        zzfx(...[,,7,.49,.48,.15,,.52,,5.4,treme,.04,.02,,,,,.5,.06]);
    });
    let rhythm = document.getElementById("rhythm");
    let stut = rhythm.value/100;
    rhythm.addEventListener("input", function() {
        stut = rhythm.value/100;
        zzfx(...[,,776,,.26,.44,,.46,.9,.7,,,,.7,,stut,,.92,.05]); // Explosion 45 - Mutation 1
    });
    let causality = document.getElementById("causality");
    let gel = 100/causality.value;
    causality.addEventListener("input", function() {
        gel = 100/causality.value;
        zzfx(...[,,368,,.06,.12,2,1.2,,,400,.01,,,gel,,,.9,.09]); // Pickup 46
    });
    let chirality = document.getElementById("chirality");
    let pitch = chirality.value*40;
    chirality.addEventListener("input", function() {
        pitch = chirality.value*40;
        zzfx(...[,,pitch,.03,,.09,1,2.18,,-72,223,.02,.01,,,-0.1,,,.06]); // Blip 47 - Mutation 1
    });
    let play = document.getElementById("play_all");
    play.addEventListener("click", function(){
        zzfx(...[,,1250,.06,,.04,,2.7,,39,,,,.5,tone]);
        zzfx(...[,.25,freq,.05,.08,.12,1,1.3,7.1,,,,,,,.1,.01,.6,.06]);
        zzfx(...[,,buzz,.01,,.4,1,1.93,.8,,,,.01,,,,.02,.52,.01]); // Shoot 17
        zzfx(...[,,7,.49,.48,.15,,.52,,5.4,treme,.04,.02,,,,,.5,.06]);
        zzfx(...[,,776,,.26,.44,,.46,.9,.7,,,,.7,,stut,,.92,.05]); // Explosion 45 - Mutation 1
        zzfx(...[,,368,,.06,.12,2,1.2,,,400,.01,,,gel,,,.9,.09]); // Pickup 46
        zzfx(...[,,pitch,.03,,.09,1,2.18,,-72,223,.02,.01,,,-0.1,,,.06]); // Blip 47 - Mutation 1
    })
    //the event occurred
    dresser.classList.remove('hidden');
    dresser.classList.add('bob-in');
})

// zome zpare zound fx
// zzfx(...[,.2,440,.4,.3,2,3,1.2,1,.4,-69,.06,.01,.3,-0.1,,.15,.59,.8]); // Elevatron
// zzfx(...[,.123,815,.874,.97,.72,,.1,.2,.17,217,.04,.03,,,,,,.44]); // Fairy
// zzfx(...[,,69,.06,.21,.39,2,,4.2,,,,.01,,-1.6,,.15,2.7,.47]); // Jump 34
