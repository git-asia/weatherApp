const API_KEY = "79d698355f4d1f972880eedcc680403d";

const cityName = document.getElementById("city-name");
const cityCountry = document.getElementById("city-country");
const weather = document.getElementById("weather");
const windSpeed = document.getElementById("wind-speed");
const pressure = document.getElementById("pressure");
const temp = document.getElementById("temp");
const tempFeel = document.getElementById("temp-feel");
const tempMin = document.getElementById("temp-min");
const tempMax = document.getElementById("temp-max");

const searchBtn = document.getElementById("search-btn");
const searchInp = document.getElementById("search-input");

const showLocationBtn = document.getElementById("show-location");
const errorMessage = document.getElementById("error-message");
const weatherIcon = document.getElementById("weather-icon");

// CONVERT TO CELCIUS

const convertToCelcius = (k) => {
  return Math.round(k - 273.15) + "°C";
};

// INFO

const weatherInfo = (info) => {
  console.log('Weather for today', info);
  cityName.textContent = info.name;
  cityCountry.textContent = info.sys.country;
  weather.textContent = info.weather[0].description;
  windSpeed.textContent = info.wind.speed + " m/s";
  pressure.textContent = info.main.pressure + " hPa";
  temp.textContent = convertToCelcius(info.main.temp);
  tempFeel.textContent = convertToCelcius(info.main.feels_like);
  tempMin.textContent = convertToCelcius(info.main.temp_min);
  tempMax.textContent = convertToCelcius(info.main.temp_max);
  weatherIcon.src = `https://openweathermap.org/img/wn/${info.weather[0].icon}.png`
  errorMessage.textContent = "";
};

// WEATHER BY USER LOCATION

const getWeatherByLocation = (coords) => {
  console.log(coords);
  const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => weatherInfo(res))
    .catch((err) => console.log(err));
};


// GET MY LOCATION

const getMyLocation = () => {
  return navigator.geolocation.getCurrentPosition((position) =>
    getWeatherByLocation(position.coords)
  );
};

getMyLocation();

// SEARCH LOCATION

const getWeatherBySearch = (city) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
  fetch(URL)
    .then((res) => res.json())
    .then((res) => weatherInfo(res))
    .catch((err) => errMsg(err));
};

// ERROR MESSAGE

const errMsg = (err) => {
  return (errorMessage.textContent = "Sorry, such city does not exist.");
};

const getSearchResult = () => {
    if (searchInp.value !== '') {
			return getWeatherBySearch(searchInp.value)
		} else {
			return (errorMessage.textContent = 'Sorry, such city does not exist.')
		}
  }



searchInp.addEventListener("change", getSearchResult);
searchBtn.addEventListener("click", getSearchResult);
showLocationBtn.addEventListener("click", getMyLocation);
// errorMessage.addEventListener("click", errMsg);
