// HTML 태그 찾기
// document.querySelector("#title").innerHTML = "7월 6일의 내 기상환경은?";
const title = document.querySelector("#title");
const weatherInfo = document.querySelector("#weather-info");
const weatherImg = document.querySelector("#weather-img");
const personImg = document.querySelector("#person-img");
const dateCardWrapper = document.querySelector(".date-card-wrapper");
const datePicker = document.querySelector("#date-picker");

function timestampToDate(timestamp) {
  const fullDate = new Date(timestamp * 1000);

  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  return `${month}월 ${date}일`;
}

function updateScreen(day) {
  let currWeather = "";
  // 상단 날짜 변경
  title.innerHTML = `${day.date}의 내 기상환경은?`;

  // 이미지 카드 변경
  if (day.tem >= 23) {
    personImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-person1.PNG?v=1622888765497";
  } else if (day.tem >= 15) {
    personImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-person2.PNG?v=1622888763615";
  } else if (day.tem >= 0) {
    personImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-person3.PNG?v=1622888763442";
  } else {
    personImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-person4.PNG?v=1622888764994";
  }

  if (parseInt(day.weather / 100) === 2) {
    currWeather = "천둥번개";
    weatherImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-bg2xx.JPG?v=1622888764135";
  } else if (parseInt(day.weather / 100) === 3) {
    currWeather = "이슬비";
    weatherImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-bg3xx.JPG?v=1622888764573";
  } else if (parseInt(day.weather / 100) === 5) {
    currWeather = "비";
    weatherImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-bg5xx.JPG?v=1622888765849";
  } else if (parseInt(day.weather / 100) === 6) {
    currWeather = "눈";
    weatherImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-bg6xx.JPG?v=1622888762618";
  } else if (parseInt(day.weather / 100) === 7) {
    currWeather = "흐림";
    weatherImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-bg7xx.JPG?v=1622888762643";
  } else if (day.weather === 800) {
    currWeather = "맑음";
    weatherImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-bg800.JPG?v=1622888762921";
  } else if (parseInt(day.weather / 100) === 8) {
    currWeather = "구름 많음";
    weatherImg.src =
      "https://cdn.glitch.com/6e02023b-7f95-461c-b86c-1b131880f401%2Fimg-bg80x.JPG?v=1622888763035";
  }

  // 상단 날씨, 기온 변경
  weatherInfo.innerHTML = `${day.tem}도 / ${currWeather}`;
}

// 데이터 가져오기
// 위도 경도
const lat = 37.477550020716194;
const lon = 126.98212524649105;

fetch(
  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appId=2fa3f03d3732cc2adffbdcc9cd0ff4af`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // data : 받아온 데이터가 담겨있는 변수
    // console.log(data);

    const curr = data.current;
    const currTimestamp = curr.dt;
    const currDate = timestampToDate(currTimestamp);
    const currTemp = Math.round(curr.temp - 273.15);
    const currWeatherId = curr.weather[0].id;

    const today = {
      date: currDate,
      tem: currTemp,
      weather: currWeatherId,
    };

    updateScreen(today);

    // 오늘 D+7일치 데이터 받아오기
    const daily = data.daily;
    let dailyList = [];

    for (let i = 1; i < daily.length; i++) {
      const dailyTimestamp = daily[i].dt;
      const dailyDate = timestampToDate(dailyTimestamp);
      const dailyTemp = Math.round(daily[i].temp.day - 273.15);
      const dailyWeatherId = daily[i].weather[0].id;

      dailyList.push({
        date: dailyDate,
        tem: dailyTemp,
        weather: dailyWeatherId,
      });
    }

    // 날짜 선택 드롭다운 버튼 클릭해서 옵션 열고 닫기
    datePicker.addEventListener("click", (e) => {
      dateCardWrapper.classList.toggle("hidden");
    });

    dailyList.map((day) => {
      const dateOption = document.createElement("div");
      dateOption.classList.add("date-card");
      dateOption.innerHTML = day.date;
      dateOption.addEventListener("click", (e) => {
        updateScreen(day);
      });
      dateCardWrapper.appendChild(dateOption);
    });
  });
