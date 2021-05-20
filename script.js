const dateCardWrapper = document.querySelector(".date-card-wrapper");
const datePicker = document.querySelector("#date-picker");
const weatherInfo = document.querySelector("#weather-info");

datePicker.addEventListener("click", (e) => {
  dateCardWrapper.classList.toggle("hidden");
});

const temperature = 18;
const weather = "때로 흐림";
const airPollution = "나쁨";
weatherInfo.innerHTML = `${temperature}도 / ${weather} / 미세먼지 ${airPollution}`;
