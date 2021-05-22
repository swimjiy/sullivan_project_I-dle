const dateCardWrapper = document.querySelector(".date-card-wrapper");
const datePicker = document.querySelector("#date-picker");
const title = document.querySelector("#title");
const weatherInfo = document.querySelector("#weather-info");

datePicker.addEventListener("click", (e) => {
  dateCardWrapper.classList.toggle("hidden");
});

const month = 5;
const date = 22;
title.innerHTML = `${month}월 ${date}일의 내 기상환경은?`;

const temperature = 18;
const weather = "때로 흐림";
const airPollution = "나쁨";
weatherInfo.innerHTML = `${temperature}도 / ${weather} / 미세먼지 ${airPollution}`;
