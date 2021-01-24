let now = new Date();
let hours = now.getHours();
let minutes = now.getMinutes();
let days = [
  `Sunday`,
  `Monday`,
  `Tuesday`,
  `Wednesday`,
  `Thursday`,
  `Friday`,
  `Saturday`
];
let day = days[now.getDay()];

let h2 = document.querySelector("h2");
h2.innerHTML = `${day} ${hours}:${minutes}`;

function displayTemperature(response) {
  console.log(response.data);
  let cityName = response.data.name;
  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName;
  let temperature = Math.round(response.data.main.temp);
  let h3temp = document.querySelector("#temperature");
  h3temp.innerHTML = `${temperature}°C`;
  let description = response.data.weather[0].description;
  let h3descrip = document.querySelector("#description");
  h3descrip.innerHTML = description;
  let humidity = response.data.main.humidity;
  let h3humid = document.querySelector("#humidity");
  h3humid.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let h3wind = document.querySelector("#wind");
  h3wind.innerHTML = `Wind speed: ${wind}km/h`;
}
function displayCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  let units = "metric";
  let apiKey = "dc8f5bf2676eeecb4b285e5dcb7dcb71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayTemperature);
}

let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", displayCity);

function showPosition(position) {
  debugger;
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "dc8f5bf2676eeecb4b285e5dcb7dcb71";
  let apiUrl = `https://api.openweathermap.org/data/2.5/find?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", getCurrentLocation);
