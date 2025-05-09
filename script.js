const pressedKeys = new Set();

function getKeyNumber(code) {
  const keyMap = {
    Digit1: "1",
    Digit2: "2",
    Digit3: "3",
    Digit4: "4",
    Digit5: "5",
    Digit6: "6",
    Digit7: "7",
    Digit8: "8",
    Digit9: "9",
    Digit0: "0"
  };
  return keyMap[code];
}

document.addEventListener("keydown", (e) => {
  const key = getKeyNumber(e.code);
  if (!key) return;

  // 이미 눌려 있고 반복 입력이 아니라면 무시
  if (pressedKeys.has(key) && !e.repeat) return;

  pressedKeys.add(key);
  playSound(key);
  animateOtamatone();
});

document.addEventListener("keyup", (e) => {
  const key = getKeyNumber(e.code);
  if (key) {
    pressedKeys.delete(key);
  }
});

function playSound(key) {
  const audio = new Audio(`sounds/${key}.mp3`);
  audio.play();
}

function animateOtamatone() {
  const otamatone = document.getElementById("otamatone");
  otamatone.classList.add("playing");
  setTimeout(() => otamatone.classList.remove("playing"), 150);
}
