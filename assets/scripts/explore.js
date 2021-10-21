// explore.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  console.log("DOM Loaded");

  //populate voice list
  let options = document.getElementById("voice-select");
  let synth = window.speechSynthesis;
  synth.addEventListener("voiceschanged", function() {
    let voices = window.speechSynthesis.getVoices();
    for(let i = 0; i < voices.length; i++) {
      let option = document.createElement("option");
      option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

      option.setAttribute("voice-name", voices[i].name);
      option.setAttribute("voice-lang", voices[i].lang);
      options.appendChild(option);
    }
  });

  let talkBtn = document.querySelector("button");
  talkBtn.addEventListener("click", function() {
    let text = document.getElementById("text-to-speak");
    let img = document.querySelector("#explore > img");
    if(options.value == "select") {
      alert("Please select a voice!");
    } else if(text.value == "") {
      alert("Please enter text!");
    } else {
      let utt = new SpeechSynthesisUtterance(text.value);
      utt.voice = synth.getVoices().filter(function(voice) {
        return voice.name + ' (' + voice.lang + ')' == options.value;
      })[0];
      synth.speak(utt);
      if(synth.speaking) {
        img.src = "assets/images/smiling-open.png"
      }
      utt.onend = function() {
        img.src = "assets/images/smiling.png";
      };
    }
  });
}