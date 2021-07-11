const dateCardWrapper = document.querySelector(".date-card-wrapper");
const datePicker = document.querySelector("#date-picker");
const title = document.querySelector("#title");
const weatherInfo = document.querySelector("#weather-info");
const weatherImg = document.querySelector("#weather-img");
const personImg = document.querySelector("#person-img");

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
    personImg.src = "images/img-person1.PNG";
  } else if (day.tem >= 15) {
    personImg.src = "images/img-person2.PNG";
  } else if (day.tem >= 0) {
    personImg.src = "images/img-person3.PNG";
  } else {
    personImg.src = "images/img-person4.PNG";
  }

  if (parseInt(day.weather / 100) === 2) {
    currWeather = "천둥번개";
    weatherImg.src = "images/img-bg2xx.JPG";
  } else if (parseInt(day.weather / 100) === 3) {
    currWeather = "이슬비";
    weatherImg.src = "images/img-bg3xx.JPG";
  } else if (parseInt(day.weather / 100) === 5) {
    currWeather = "비";
    weatherImg.src = "images/img-bg5xx.JPG";
  } else if (parseInt(day.weather / 100) === 6) {
    currWeather = "눈";
    weatherImg.src = "images/img-bg6xx.JPG";
  } else if (parseInt(day.weather / 100) === 7) {
    currWeather = "흐림";
    weatherImg.src = "images/img-bg7xx.JPG";
  } else if (day.weather === 800) {
    currWeather = "맑음";
    weatherImg.src = "images/img-bg800.JPG";
  } else if (parseInt(day.weather / 100) === 8) {
    currWeather = "구름 많음";
    weatherImg.src = "images/img-bg80x.JPG";
  }

  // 상단 날씨, 기온 변경
  weatherInfo.innerHTML = `${day.tem}도 / ${currWeather}`;
}

// 위도 경도 입력
const lat = 37.477550020716194;
const lon = 126.98212524649105;

fetch(
  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&units=metric&appId=2fa3f03d3732cc2adffbdcc9cd0ff4af`
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // data = API 호출 후 원본 데이터

    const curr = data.current;
    const currTimestamp = curr.dt;
    const currDate = timestampToDate(currTimestamp);
    const currTemp = Math.round(curr.temp);
    const currWeatherId = curr.weather[0].id;

    // 오늘의 기상정보 객체 생성
    const today = {
      date: currDate,
      tem: currTemp,
      weather: currWeatherId,
    };

    updateScreen(today);

    // +7일 데이터 받아오기

    const daily = data.daily;
    let dailyList = [];

    for (let i = 1; i < daily.length; i++) {
      const dailyTimestamp = daily[i].dt;
      const dailyDate = timestampToDate(dailyTimestamp);
      const dailyTemp = Math.round(daily[i].temp.day);
      const dailyWeatherId = daily[i].weather[0].id;

      dailyList.push({
        date: dailyDate,
        tem: dailyTemp,
        weather: dailyWeatherId,
      });
    }

    // 날짜 선택 드롭다운 버튼 클릭해서 옵션 열고 닫기
    datePicker.addEventListener("click", function () {
      dateCardWrapper.classList.toggle("hidden");
    });

    // 날짜 선택지 생성 및 이벤트 부착
    for (let i = 0; i < dailyList.length; i++) {
      const dateOption = document.createElement("div");
      dateOption.classList.add("date-card");
      dateOption.innerHTML = dailyList[i].date;
      dateOption.addEventListener("click", (e) => {
        updateScreen(dailyList[i]);
        dateCardWrapper.classList.toggle("hidden");
        window.scroll({ top: 0, behavior: "smooth" });
      });
      dateCardWrapper.appendChild(dateOption);
    }
  });
