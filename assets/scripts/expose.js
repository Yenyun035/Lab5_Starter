// expose.js

window.addEventListener('DOMContentLoaded', init);

function init() {
  console.log("DOM Loaded");
  //change image based on 
  let horn = document.getElementById("horn-select");
  let img = document.querySelector("#expose > img");
  let audio = document.getElementsByClassName("hidden");
  horn.addEventListener("change", function(event) {
    if(event.target.value == "air-horn") {
      img.src = "assets/images/air-horn.svg";
      audio[0].src = "assets/audio/air-horn.mp3";
    } else if(event.target.value == "car-horn") {
      img.src = "assets/images/car-horn.svg";
      audio[0].src = "assets/audio/car-horn.mp3";
    } else if(event.target.value == "party-horn") {
      img.src = "assets/images/party-horn.svg";
      audio[0].src = "assets/audio/party-horn.mp3";
    }
  });

  //change volume icon and set audio volume
  let volume = document.getElementById("volume-controls");
  let volIcon = document.querySelector("#volume-controls > img");
  volume.addEventListener("input", function(event) {
    audio[0].volume = event.target.value / 100.0;
    if(event.target.value == 0) {
      volIcon.src = "assets/icons/volume-level-0.svg";
    } else if(event.target.value < 33) {
      volIcon.src = "assets/icons/volume-level-1.svg";
    }  else if(event.target.value < 67) {
      volIcon.src = "assets/icons/volume-level-2.svg";
    } else {
      volIcon.src = "assets/icons/volume-level-3.svg";
    }
  });

  //play audio and if party horn is selected, trigger JSConfetti
  let playSound = document.querySelector("button");
  const jsConfetti = new JSConfetti();
  playSound.addEventListener("click", function() {
    if(audio[0].getAttribute("src") == "") {
      alert("Please choose a horn!");
    } else {
      if(horn.value == "party-horn") {
        jsConfetti.addConfetti();
      }
      audio[0].play();
    }
  });
}
