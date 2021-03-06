function searchCity(event) {
  formatDateTime();
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  if (searchInput.value) {
    searchCityWeather(searchInput.value);
  } else {
    let cityDisplay = document.querySelector("#city-display");
    cityDisplay.innerHTML = null;
    alert("Search for a city.");
  }
}

function getForecast(coordinates) {
  let apiKey = "8f74c72399c350e75af3f25df3b5a966";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}

function showTemp(response) {
  console.log(response.data);
  let cityDisplay = document.querySelector("#city-display");
  cityDisplay.innerHTML = response.data.name;
  let fahrenheit = document.querySelector("#fahrenheit");
  let sourcedTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  let weatherDescription = document.querySelector("#weather-description");
  let windSpeed = document.querySelector("#wind-speed");
  let actualWindSpeed = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#icon");
  let iconCode = response.data.weather[0].icon;

  celsiusTemp = response.data.main.temp;
  temp.innerHTML = ` ${sourcedTemp}°F`;
  weatherDescription.innerHTML = `${response.data.weather[0].description} `;
  windSpeed.innerHTML = `| Wind Speed: ${actualWindSpeed}mph`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${iconCode}@2x.png`
  );

  getForecast(response.data.coord);
}

function searchCityWeather(cityName) {
  let apiKey = "8f74c72399c350e75af3f25df3b5a966";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=imperial`)
    .then(showTemp);
}

function formatDateTime(timestamp) {
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
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours === 12) {
    time = `${hours}:${minutes}pm`;
  } else if (hours > 12) {
    time = `${hours - 12}:${minutes}pm`;
  } else {
    time = `${hours}:${minutes}am`;
  }

  let currentDateTime = document.querySelector("#current-date-time");
  currentDateTime.innerHTML = `As of ${day}, ${month} ${date} at ${time}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let realForecast = response.data.daily;

  let forecast = document.querySelector("#weather-forecast");

  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  let forecastHTML = `<div class="row">`;
  realForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weatherForecastDate">${formatForecastDay(
          forecastDay.dt
        )}</div>
        <img 
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png" 
        alt="" 
        width="42"
      />
      <div class="weatherForecastTemp">
        <span class="weatherForecastTempMax">${Math.round(
          forecastDay.temp.max
        )}</span>
        <span class="weatherForecastTempMin">${Math.round(
          forecastDay.temp.min
        )}</span>
      </div>
      </div>
      `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecast.innerHTML = forecastHTML;
}

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity);

let celsiusTemp = null;
