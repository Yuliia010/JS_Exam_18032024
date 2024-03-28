
function formatDate(localtime, is_day) {
  let date = new Date(localtime);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let dayNumber = date.getDate();

  let months = [
    "Januaray",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[date.getMonth()];

  let year = date.getFullYear();
  let hours = date.getHours();

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  if (hours < 10) {
    hours = `0${hours}`;
  }


  if (!is_day) {
    let formControl = document.querySelector("#city-input");
    formControl.classList.add("nightmode");
   
    let locationButton = document.querySelector("#location-button");
    locationButton.classList.add("nightmode");
    let subminButton = document.querySelector("#button--submit");
    subminButton.classList.add("nightmode");
    let locationIcon = document.querySelector("#location-icon");
    locationIcon.setAttribute("src", `./Icons/location-dark.svg`);
    let weatherForecast = document.querySelector(".weather-forecast");
    weatherForecast.classList.add("nightmode");
    let weatherBackground = document.querySelector(".weather-app");
    weatherBackground.classList.add("nightmode");
  } else {
    let formControl = document.querySelector("#city-input");
    formControl.classList.remove("nightmode");
    let locationButton = document.querySelector("#location-button");
    locationButton.classList.remove("nightmode");
    let subminButton = document.querySelector("#button--submit");
    subminButton.classList.remove("nightmode");
    let locationIcon = document.querySelector("#location-icon");
    locationIcon.setAttribute("src", `./Icons/location-light.svg`);
    let weatherForecast = document.querySelector(".weather-forecast");
    weatherForecast.classList.remove("nightmode");
    let weatherBackground = document.querySelector(".weather-app");
    weatherBackground.classList.remove("nightmode");
  }
  return `${day}, ${dayNumber} ${month} ${year} | ${hours} : ${minutes} ${ampm}`;
}

function formatDays(localtime) {
  let date = new Date(localtime);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.forecast.forecastday;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      let maxTemp = Math.round(forecastDay.day.maxtemp_c);
      let minTemp = Math.round(forecastDay.day.mintemp_c);
      let icon = getIcon(forecastDay.day.condition.text, true);
      forecastHTML =
        forecastHTML +
        `
              <div class="col weekdays">
                <h4>${formatDays(forecastDay.date)}</h4>
                <img src="./Icons/${icon}" alt="${
            forecastDay.day.condition.text
          }" class="weekday-weather" />
                <p class="forecast-temp">
                  <span class="forecast-temp-max">${maxTemp}°</span> -
                  <span class="forecast-temp-min">${minTemp}°</span>
                </p>
                <p class="weather-type">${forecastDay.day.condition.text}</p>
              </div>
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function search(city) {
 
  let apiKey = "3e21b608b818455ea86165609230810";
  let apiUrl= `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=4&aqi=false&alerts=false`

  ParseJSON(apiUrl);
}

function getIcon(condition, isDay)
{
  condition = condition.trim();
  const words = condition.split(' ');
  words[0] = words[0][0].toUpperCase() + words[0].slice(1).toLowerCase();
  for (let i = 1; i < words.length; i++) {
    words[i] = words[i].toLowerCase();
  }
  condition = words.join(' ');

  var icons = {
    "Sunny": "sunny.png",
    "Clear": "clear.png",
    "Partly cloudy": "partly-cloudy.png",
    "Cloudy": "cloudy.png",
    "Mist": "cloudy.png",
    "Overcast": "overcast.png",
    "Patchy rain possible": "patchy-rain.png",
    "Patchy rain nearby": "patchy-rain.png",
    "Patchy sleet possible": "patchy-rain.png",
    "Patchy freezing drizzle possible": "patchy-rain.png",
    "Patchy light drizzle": "patchy-rain.png",
    "Light drizzle": "patchy-rain.png",
    "Freezing drizzle": "patchy-rain.png",
    "Patchy light rain": "patchy-rain.png",
    "Moderate rain at times": "patchy-rain.png",
    "Light rain": "patchy-rain.png",
    "Moderate rain": "patchy-rain.png",
    "Light freezing rain": "patchy-rain.png",
    "Light sleet": "patchy-rain.png",
    "Light rain shower": "patchy-rain.png",
    "Light sleet showers": "patchy-rain.png",
    "Patchy light rain with thunder": "patchy-rain.png",
    "Thundery outbreaks possible": "patchy-rain.png",
    "Patchy snow possible": "snow.png",
    "Blowing snow": "snow.png",
    "Blizzard ": "snow.png",
    "Fog ": "fog.png",
    "Freezing fog": "fog.png",
    "Heavy freezing drizzle": "heavy-rain.png",
    "Heavy rain at times": "heavy-rain.png",
    "Heavy rain": "heavy-rain.png",
    "Moderate or heavy freezing rain": "heavy-rain.png",
    "Moderate or heavy sleet": "heavy-rain.png",
    "Moderate or heavy rain shower": "heavy-rain.png",
    "Torrential rain shower": "heavy-rain.png",
    "Moderate or heavy sleet showers": "heavy-rain.png",
    "Patchy light snow": "snow.png",
    "Light snow": "snow.png",
    "Patchy moderate snow": "snow.png",
    "Moderate snow": "snow.png",
    "Patchy heavy snow": "snow.png",
    "Heavy snow": "snow.png",
    "Ice pellets": "snow.png",
    "Light snow showers": "snow.png",
    "Moderate or heavy snow showers": "snow.png",
    "Light showers of ice pellets": "snow.png",
    "Patchy light snow with thunder": "snow.png",
    "Moderate or heavy snow with thunder": "snow.png"
  };
    if (icons.hasOwnProperty(condition)) {
      let icon = icons[condition];
      if (icon == "snow.png")
      {
          return isDay ? "snow_d.png" : "snow_n.png";
      }
      if (icon == "partly-cloudy.png")
      {
          return isDay ? "partly-cloudy_d.png" : "partly-cloudy_n.png";
      }
      return icon;
    } else {
      
      return "";
    }
}

function updateWeatherInfo(weatherData) {
  document.getElementById("city-name").textContent = weatherData.location.name;
  document.getElementById("temperature").textContent = weatherData.current.temp_c;
  document.getElementById("weather-description").textContent = weatherData.current.condition.text;
  document.getElementById("feels-like").textContent = weatherData.current.feelslike_c;
  document.getElementById("humidity-level").textContent =  weatherData.current.humidity;
  document.getElementById("wind-speed").textContent = weatherData.current.wind_kph;
  let localtime = weatherData.location.localtime;
  let formatdate = formatDate(localtime, weatherData.current.is_day);
  //alert(formatdate);
  document.getElementById("date-hour").innerText = formatdate;
  const weatherIcon = document.getElementById("weather-icon");
  let icon = getIcon(weatherData.current.condition.text, weatherData.current.is_day);

  weatherIcon.setAttribute(
    "src",
    `./Icons/${icon}`
  );
  displayForecast(weatherData);
}

document.getElementById("search-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const city = document.getElementById("city-input").value.trim();
  search(city);
});



function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getPosition, showError);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function getPosition(position) {

  let apiKey = "3e21b608b818455ea86165609230810";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  console.log("Latitude:", lat);
  console.log("Longitude:", lon);
  let q = `${lat},${lon}`;
  console.log(q);
  let apiUrl= `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${q}&days=4&aqi=false&alerts=false`;
  ParseJSON(apiUrl);
}

function showError(error) {
  console.log("Error occurred while getting location:", error);
}
function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let isFahrenheitActive = fahrenheitlink.classList.contains("active");

  if (isFahrenheitActive) {
    return; 
  }

  let currentTemperature = parseFloat(temperatureElement.innerText); 
  let convertedTemperature = ((currentTemperature * 9/5) + 32).toFixed(1);

  if (convertedTemperature.endsWith('.0')) {
    convertedTemperature = parseInt(convertedTemperature);
  }
  temperatureElement.innerText = convertedTemperature;
  celsiuslink.classList.remove("active");
  fahrenheitlink.classList.add("active");
  temperatureElement.dataset.celsius = currentTemperature;
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let isCelsiusActive = celsiuslink.classList.contains("active");

  if (isCelsiusActive) {
    return; 
  }

  let currentTemperature = parseFloat(temperatureElement.innerText);
  let convertedTemperature = ((currentTemperature - 32) * 5/9).toFixed(1);
 
  if (convertedTemperature.endsWith('.0')) {
    convertedTemperature = parseInt(convertedTemperature);
  }
  temperatureElement.innerText = convertedTemperature;
  celsiuslink.classList.add("active");
  fahrenheitlink.classList.remove("active");
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getLocation);

let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemperature);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemperature);

//search("Kyiv");
