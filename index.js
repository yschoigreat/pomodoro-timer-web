"use strict";

// 설정 페이지와 공유하는 localStorage 키
const STORAGE_KEY = "pomodoroMinutes";
const FALLBACK_MINUTES = 25;

let timerId = null;

const timeDisplay = document.getElementById("time-display");

// 저장된 설정 시간(분)을 읽어옴. 없거나 잘못된 값이면 25분
function getConfiguredMinutes() {
  const saved = Number(localStorage.getItem(STORAGE_KEY));
  if (Number.isInteger(saved) && saved >= 1 && saved <= 60) {
    return saved;
  }
  return FALLBACK_MINUTES;
}

let remainingSeconds = getConfiguredMinutes() * 60;

// 남은 시간을 MM:SS 형식으로 화면에 표시
function renderTime() {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const mm = String(minutes).padStart(2, "0");
  const ss = String(seconds).padStart(2, "0");
  timeDisplay.textContent = `${mm}:${ss}`;
}

// 시작 버튼: 1초마다 남은 시간을 줄이는 타이머 시작
function startTimer() {
  if (timerId !== null) return; // 이미 실행 중이면 무시
  if (remainingSeconds <= 0) return;

  timerId = setInterval(() => {
    remainingSeconds -= 1;
    renderTime();

    if (remainingSeconds <= 0) {
      stopTimer();
    }
  }, 1000);
}

// 정지 버튼: 진행 중인 타이머 정지
function stopTimer() {
  if (timerId === null) return;
  clearInterval(timerId);
  timerId = null;
}

// 초기화 버튼: 타이머를 정지하고 설정된 시간으로 되돌림
function resetTimer() {
  stopTimer();
  remainingSeconds = getConfiguredMinutes() * 60;
  renderTime();
}

// 설정 페이지에서 시간이 바뀌면 즉시 반영 (다른 탭/창에서 발생)
window.addEventListener("storage", (event) => {
  if (event.key !== STORAGE_KEY) return;
  stopTimer();
  remainingSeconds = getConfiguredMinutes() * 60;
  renderTime();
});

// 초기 화면 표시
renderTime();
