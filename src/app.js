let apiKey = "0ba62b5bb8b4610b05d9721ec63dfdd3";

function returnDay(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[date.getDay()];
}

function displayDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let day = returnDay(timestamp);

  return `${day} ${hours}:${minutes}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let days = response.data.daily;

  let forecastHTML = "";
  days.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `
      <div class="col">
              <div class="weather-forecast-date">${returnDay(
                day.dt * 1000
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  day.weather[0].icon
                }@2x.png"
                alt=""
                width="36"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(
                  day.temp.max
                )}° </span
                ><span class="weather-forecast-temperature-min">${Math.round(
                  day.temp.min
                )}° </span>
              </div>
            </div>
            `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coords) {
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`;
  axios.get(api).then(displayForecast);
}

function displayWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = displayDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let weatherEndpoint = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=metric`;
  axios.get(weatherEndpoint).then(displayWeather);
}

function submit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");
  search(searchInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submit);

let currentButton = document.querySelector("#currentButton");
currentButton.addEventListener("click", getCurrentPosition);

function handlePosition(pos) {
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(api).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition, search("Kyiv"));
}

getCurrentPosition();
