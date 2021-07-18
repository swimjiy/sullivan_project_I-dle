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

    title.innerHTML = `${today.date}의 내 기상환경은?`;
    let currWeather = "";
    // 상단 날짜 변경

    // 이미지 카드 변경
    if (today.tem >= 23) {
      personImg.src = "images/img-person1.PNG";
    } else if (today.tem >= 15) {
      personImg.src = "images/img-person2.PNG";
    } else if (today.tem >= 0) {
      personImg.src = "images/img-person3.PNG";
    } else {
      personImg.src = "images/img-person4.PNG";
    }

    if (parseInt(today.weather / 100) === 2) {
      currWeather = "천둥번개";
      weatherImg.src = "images/img-bg2xx.JPG";
    } else if (parseInt(today.weather / 100) === 3) {
      currWeather = "이슬비";
      weatherImg.src = "images/img-bg3xx.JPG";
    } else if (parseInt(today.weather / 100) === 5) {
      currWeather = "비";
      weatherImg.src = "images/img-bg5xx.JPG";
    } else if (parseInt(today.weather / 100) === 6) {
      currWeather = "눈";
      weatherImg.src = "images/img-bg6xx.JPG";
    } else if (parseInt(today.weather / 100) === 7) {
      currWeather = "흐림";
      weatherImg.src = "images/img-bg7xx.JPG";
    } else if (today.weather === 800) {
      currWeather = "맑음";
      weatherImg.src = "images/img-bg800.JPG";
    } else if (parseInt(today.weather / 100) === 8) {
      currWeather = "구름 많음";
      weatherImg.src = "images/img-bg80x.JPG";
    }

    // 상단 날씨, 기온 변경
    weatherInfo.innerHTML = `${today.tem}도 / ${currWeather}`;

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

    dailyList.map((day) => {
      const dateOption = document.createElement("div");
      dateOption.classList.add("date-card");
      dateOption.innerHTML = day.date;
      dateCardWrapper.appendChild(dateOption);
    });
  });
