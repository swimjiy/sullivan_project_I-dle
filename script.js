const dateCardWrapper = document.querySelector(".date-card-wrapper");
const datePicker = document.querySelector("#date-picker");
const title = document.querySelector("#title");
const weatherInfo = document.querySelector("#weather-info");


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
  dateCardWrapper.classList.toggle("hcurrIdden");
});

function timestampToDate(timestamp) {
  const fullDate = new Date(timestamp * 1000);

  const month = fullDate.getMonth() + 1;
  const date = fullDate.getDate();

  return `${month}월 ${date}일`;
}

//khj
function getWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appId=2fa3f03d3732cc2adffbdcc9cd0ff4af`)
    .then(function (response) {
      return response.json()
    }).then(function (data) {
      //current
      const curr = data.current;

      const currTimestamp = curr.dt;
      const currDate = timestampToDate(currTimestamp);
      const currTemp = Math.round(curr.temp - 273.15);
      const currWeatherId = curr.weather[0].id;
      let currWeather = '';

      title.innerHTML = `${currDate}의 내 기상환경은?`;


      if (parseInt(currWeatherId / 100) === 2) {
        currWeather = "천둥번개";
      } else if (parseInt(currWeatherId / 100) === 3) {
        currWeather = "이슬비"
      } else if (parseInt(currWeatherId / 100) === 5) {
        currWeather = "비"
      } else if (parseInt(currWeatherId / 100) === 6) {
        currWeather = "눈"
      } else if (parseInt(currWeatherId / 100) === 7) {
        currWeather = "흐림"
      } else if (currWeatherId === 800) {
        currWeather = "맑음"
      } else if (parseInt(currWeatherId / 100) === 8) {
        currWeather = "구름 많음"
      }

      weatherInfo.innerHTML = `${currTemp}도 / ${currWeather}`;

      //daily

      const daily = data.daily;
      let dailyList = [];

      for (i = 1; i < daily.length; i++) {
        const dailyTimestamp = daily[i].dt;
        const dailyDate = timestampToDate(dailyTimestamp);
        const dailyTemp = Math.round(daily[i].temp.day - 273.15);
        const dailyWeather = daily[i].weather[0].id;

        dailyList.push({ date: dailyDate, tem: dailyTemp, weather: dailyWeather });
      }
    })

}

const lat = 37.477550020716194;
const lon = 126.98212524649105;

getWeather(lat, lon);

