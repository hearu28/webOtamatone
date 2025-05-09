const pressedKeys = new Set();

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!pressedKeys.has(key)) {
    pressedKeys.add(key);
    if (isPlayableKey(key)) {
      playSound(key);
      animateOtamatone();
    }
  }
});

document.addEventListener("keyup", (e) => {
  pressedKeys.delete(e.key);
});

function isPlayableKey(key) {
  return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(key);
}

function playSound(key) {
  const context = new (window.AudioContext || window.webkitAudioContext)();
  const request = new XMLHttpRequest();
  request.open("GET", "sounds/base_note.mp3", true);
  request.responseType = "arraybuffer";

  request.onload = function () {
    context.decodeAudioData(request.response, function (buffer) {
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.playbackRate.value = playbackRates[key];
      source.connect(context.destination);
      source.start(0);
    });
  };

  request.send();
}

function animateOtamatone() {
  const otamatone = document.getElementById("otamatone");
  otamatone.classList.add("playing");
  setTimeout(() => otamatone.classList.remove("playing"), 150);
}

const playbackRates = {
  "1": 0.5946,
  "2": 0.6674,
  "3": 0.7491,
  "4": 0.8409,
  "5": 0.9441,
  "6": 1.0,
  "7": 1.0595,
  "8": 1.1225,
  "9": 1.1892,
  "0": 1.2599
};
