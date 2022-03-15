function showTemp(response) {
  let cityDisplay = document.querySelector("#city-display");
  cityDisplay.innerHTML = response.data.name;
  let sourcedTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#temp");
  let weatherDescription = document.querySelector("#weather-description");
  temp.innerHTML = `${sourcedTemp}°C`;
  weatherDescription.innerHTML = `Today it is ${response.data.weather[0].description}.`;
}

// function activityName (response) {
//   let weatherIcon = response.data.weather[0].icon;
//   if (weatherIcon === 01d)
//   {activity = `biking to the store`}
//   if (weatherIcon === 02d)
//   {activity = `biking to the store`}
//   if (weatherIcon === 03d)
//   {activity = `taking pictures of nature`}
//   if (weatherIcon === 04d)
//   {activity = `taking pictures of nature`}
//   if (weatherIcon === 09d)
//    {activity = `reading`}
//   if (weatherIcon === 10d)
//    {activity = `writing a note to a friend`}
//   if (weatherIcon === 11d)
//    {activity = `building a blanket fort`}
//   if (weatherIcon === 13d)
//    {activity = `playing in the snow`}
//   if (weatherIcon === 50d)
//    {activity = `drinking hot chocolate`}
//    if (weatherIcon === 01n)
//   {activity = `learning about astrology`}
//   if (weatherIcon === 02n)
//   {activity = `learning about astrology`}
//   if (weatherIcon === 03n)
//   {activity = `playing cards`}
//   if (weatherIcon === 04n)
//   {activity = `reading`}
//   if (weatherIcon === 09n)
//    {activity = `trying a new recipe`}
//   if (weatherIcon === 10n)
//    {activity = `writing a note to a friend`}
//   if (weatherIcon === 11n)
//    {activity = `building a blanket fort`}
//   if (weatherIcon === 13n)
//    {activity = `drinking hot chocolate`}
//   if (weatherIcon === 50n)
//    {activity = `going to bed early`}
// }

function searchCityWeather(cityName) {
  let apiKey = "8f74c72399c350e75af3f25df3b5a966";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${cityName}&appid=${apiKey}&units=metric`)
    .then(showTemp);
}

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

let searchEngine = document.querySelector("#search-engine");
searchEngine.addEventListener("submit", searchCity);

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
  if (hours >= 12) {
    time = `${hours - 12}:${minutes}pm`;
  } else {
    time = `${hours}:${minutes}am`;
  }

  let currentDateTime = document.querySelector("#current-date-time");
  currentDateTime.innerHTML = `As of ${day}, ${month} ${date} at ${time}`;
}
