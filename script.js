// HTML 태그 찾기
// document.querySelector("#title").innerHTML = "7월 6일의 내 기상환경은?";
const title = document.querySelector("#title");
const weatherInfo = document.querySelector("#weather-info");
const weatherImg = document.querySelector("#weather-img");
const personImg = document.querySelector("#person-img");

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
    console.log(data);
  });
