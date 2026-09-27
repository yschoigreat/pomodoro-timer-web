"use strict";

// 메인 페이지와 공유하는 localStorage 키
const STORAGE_KEY = "pomodoroMinutes";
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const input = document.getElementById("timer-minutes");
const submitButton = document.querySelector(".setting-submit");

// 입력값이 유효한지 검사 (비어 있지 않고, 1~60 사이의 정수)
function isValid(value) {
  if (value.trim() === "") return false;
  const minutes = Number(value);
  return Number.isInteger(minutes) && minutes >= MIN_MINUTES && minutes <= MAX_MINUTES;
}

// 유효하지 않으면 저장 버튼 비활성화
function updateButtonState() {
  submitButton.disabled = !isValid(input.value);
}

// 저장된 값이 있으면 입력창에 채워 넣기
const savedMinutes = localStorage.getItem(STORAGE_KEY);
if (savedMinutes !== null) {
  input.value = savedMinutes;
}
updateButtonState();

input.addEventListener("input", updateButtonState);

submitButton.addEventListener("click", () => {
  if (!isValid(input.value)) return;
  const minutes = Number(input.value);
  // localStorage에 저장 → 새로고침 후에도 유지, 메인 페이지에서 즉시 사용
  localStorage.setItem(STORAGE_KEY, String(minutes));
  submitButton.textContent = "저장됨!";
  setTimeout(() => {
    submitButton.textContent = "설정 완료";
  }, 1000);
});
