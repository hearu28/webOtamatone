const pressedKeys = new Set();
const activeSources = new Map(); // 키에 대응하는 재생 노드 저장
const context = new (window.AudioContext || window.webkitAudioContext)();
let sharedBuffer = null;

const playbackRates = {
  1: 0.5946,
  2: 0.6674,
  3: 0.7491,
  4: 0.8409,
  5: 0.9441,
  6: 1.0,
  7: 1.0595,
  8: 1.1225,
  9: 1.1892,
  0: 1.2599,
};

document.addEventListener("keydown", (e) => {
  const key = e.key;
  if (!pressedKeys.has(key) && isPlayableKey(key)) {
    pressedKeys.add(key);
    playSound(key);
    animateOtamatone();
  }
});

document.addEventListener("keyup", (e) => {
  const key = e.key;
  pressedKeys.delete(key);

  if (activeSources.has(key)) {
    const source = activeSources.get(key);
    source.stop();
    activeSources.delete(key);
  }
});

function isPlayableKey(key) {
  return Object.keys(playbackRates).includes(key);
}

function loadBuffer() {
  return fetch("sounds/base_note.mp3")
    .then((res) => res.arrayBuffer())
    .then((data) => context.decodeAudioData(data))
    .then((buffer) => {
      sharedBuffer = buffer;
    });
}

function playSound(key) {
  if (!sharedBuffer) return;

  const source = context.createBufferSource();
  source.buffer = sharedBuffer;
  source.playbackRate.value = playbackRates[key];
  source.connect(context.destination);
  source.start();
  activeSources.set(key, source);
}

function animateOtamatone() {
  const otamatone = document.getElementById("otamatone");
  otamatone.classList.add("playing");
  setTimeout(() => otamatone.classList.remove("playing"), 150);
}

// 첫 로딩 시 오디오 버퍼 미리 로드
loadBuffer();
