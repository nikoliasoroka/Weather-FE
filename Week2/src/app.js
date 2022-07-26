let apiKey = "0ba62b5bb8b4610b05d9721ec63dfdd3";
let weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}`;
let lon;
let lat;

function handlePosition(location) {
  lat = location.coords.latitude;
  lon = location.coords.longitude;
}

function showDate() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = `${days[now.getDay()]}`;
  let time = `${now.getHours()}:${now.getMinutes()}`;

  let timeElement = document.querySelector("#date");
  timeElement.innerHTML = `${day} ${time}`;
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search");
  let temperature = document.querySelector("#temperature");
  let city = document.querySelector("#city");
  let cityUrl = weatherEndpoint + `&q=${input.value}&units=metric`;

  axios.get(cityUrl).then(function (response) {
    city.innerHTML = response.data.name;
    temperature.innerHTML = Math.round(response.data.main.temp);
  });
}

let searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", search);

let currentButton = document.querySelector("#currentButton");

function setCurrent(event) {
  event.preventDefault();
  let city = document.querySelector("#city");
  let temperature = document.querySelector("#temperature");
  let currentUrl = weatherEndpoint + `&lat=${lat}&lon=${lon}&units=metric`;

  axios.get(currentUrl).then(function (response) {
    city.innerHTML = response.data.name;
    temperature.innerHTML = Math.round(response.data.main.temp);
  });
}
currentButton.addEventListener("click", setCurrent);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", function (event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = (temperature.innerText - 32) / 1.8;
});

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", function (event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = temperature.innerText * 1.8 + 32;
});

function getTemperatureByCity(city) {
  let cityUrl = weatherEndpoint + `&q=${city}`;

  axios.get(cityUrl).then(setCurrent);
}

navigator.geolocation.getCurrentPosition(handlePosition);
showDate();
