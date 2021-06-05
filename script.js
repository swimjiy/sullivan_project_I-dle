// HTML 태그 찾기
// document.querySelector("#title").innerHTML = "7월 6일의 내 기상환경은?";
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
  });
