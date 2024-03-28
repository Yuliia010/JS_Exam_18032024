function GetJSON(apiUrl) {
    return new Promise((resolve, reject) => {
      let request;
      if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
      } else {
        request = new ActiveXObject("Microsoft.XMLHTTP");
      }
      request.open("GET", apiUrl, true);
      
      request.onreadystatechange = function(){
        if (this.readyState === 4) {
          if (this.status == 200) {
            const weatherData = JSON.parse(this.responseText);
           
            resolve(weatherData);
          } else if (this.status == 404) {
            reject("Resource not found!");
          } else {
            reject(`${this.statusText}`);
          }
        }
      }
      request.send();
    });
  }
  
  function ParseJSON(apiURL){
    GetJSON(apiURL)
    .then(weatherData => {
        
      updateWeatherInfo(weatherData);
    })
    .catch(error => console.error(error));
  }

document.addEventListener("DOMContentLoaded", function() {
  ParseJSON("http://api.weatherapi.com/v1/forecast.json?key=3e21b608b818455ea86165609230810&q=Kyiv&days=4&aqi=false&alerts=false");
});