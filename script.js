const dateCardWrapper = document.querySelector(".date-card-wrapper");
const datePicker = document.querySelector("#date-picker");
const title = document.querySelector("#title");
const weatherInfo = document.querySelector("#weather-info");

// 지정된 날짜로 제목 변경
const month = 5;
const date = 22;
title.innerHTML = `${month}월 ${date}일의 내 기상환경은?`;

// 지정된 날짜에 대한 날짜 정보 출력
const temperature = 18;
const weather = "때로 흐림";
const airPollution = "나쁨";
weatherInfo.innerHTML = `${temperature}도 / ${weather} / 미세먼지 ${airPollution}`;

// 드롭다운 옵션 동적 생성
const dates = ["2021년 5월 21일", "2021년 5월 22일", "2021년 5월 23일"];
dates.map((date) => {
  const dateOption = document.createElement("div");
  dateOption.classList.add("date-card");
  dateOption.dataset.value = date;
  dateOption.innerHTML = date;
  dateCardWrapper.appendChild(dateOption);
});

// 날짜 선택 드롭다운 버튼 클릭해서 옵션 열고 닫기
datePicker.addEventListener("click", (e) => {
  dateCardWrapper.classList.toggle("hidden");
});
