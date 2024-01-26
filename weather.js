// functions.js

var weatherContainer; // Globális változó
var weatherResult; // Globális változó
var weatherIcon; // Globális változó

function getWeather() {
  var city = document.getElementById('cityInput').value;
  weatherContainer = document.getElementById('weather-container');
  weatherResult = document.getElementById('weather-result');
  weatherIcon = document.getElementById('weather-icon');

  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac81dcd0d69a84ac753677885c962c61&units=metric`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data && data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].description && data.weather[0].icon) {
        var temperature = data.main.temp;
        var condition = data.weather[0].description;
        var iconCode = data.weather[0].icon;

        weatherResult.innerHTML = `${city} időjárása: ${temperature}°C <img id="weather-icon" src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">, ${condition}`;
        weatherContainer.style.display = 'block';
      } else {
        console.error('Hibás válasz az időjárás lekérdezése során:', data);
      }
    })
    .catch(error => {
      console.error('Hiba történt az időjárás lekérdezése közben:', error);
    });
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;
      weatherContainer = document.getElementById('weather-container');
      weatherResult = document.getElementById('weather-result');
      weatherIcon = document.getElementById('weather-icon');

      var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=ac81dcd0d69a84ac753677885c962c61&units=metric`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          if (data && data.main && data.main.temp && data.weather && data.weather[0] && data.weather[0].description && data.weather[0].icon) {
            var temperature = data.main.temp;
            var condition = data.weather[0].description;
            var iconCode = data.weather[0].icon;

            weatherResult.innerHTML = `Az aktuális tartózkodási hely időjárása: ${temperature}°C <img id="weather-icon" src="http://openweathermap.org/img/wn/${iconCode}.png" alt="Weather Icon">, ${condition}`;
            weatherContainer.style.display = 'block';
          } else {
            console.error('Hibás válasz az időjárás lekérdezése során:', data);
          }
        })
        .catch(error => {
          console.error('Hiba történt az időjárás lekérdezése közben:', error);
        });
    }, error => {
      console.error('Hiba történt a tartózkodási hely lekérdezése közben:', error);
    });
  } else {
    console.error('A böngésző nem támogatja a tartózkodási hely lekérdezését.');
  }
}
