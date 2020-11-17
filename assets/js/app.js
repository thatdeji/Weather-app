//Service workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js");
  // .then(reg => console.log("service worker registered", reg))
  // .catch(err => console.log("service worker not registered", err));
}

// instantiate the storage object
const storage = new Storage();
// instantiate the weather object
const ui = new UI();
// instantiate the weather object
const weather = new Weather(document.getElementById("city").value);

// Updates toggle button state when DOM is loaded
document.addEventListener("DOMContentLoaded", e => {
  ui.toggle(storage.getDegrees());
});

// Adds event listener to toggle button for uchanging temperature unit
document.querySelector(".toggle-btn").addEventListener("click", e => {
  storage.setDegrees();
  // if(document.getElementById('weather-result-card-wrapper')) {
  ui.changeTemp(storage.getDegrees());
  // }
});

//Change location event
document.getElementById("btn").addEventListener("click", e => {
  const city = document.getElementById("city").value;
  ui.openLoader();
  // Change Weather location
  weather.changeLocation(city);
  //Get Weather from API
  getWeather();

  e.preventDefault();
});

// Gets weather info from API and prints it to the DOM
function getWeather() {
  weather
    .getWeather()
    .then(res => {
      ui.paint(res, storage.getDegrees());
    })
    .catch(err => {
      ui.error("Can't find location");
    })
    .finally(() => {
      ui.removeLoader();
      document.getElementById("city").value = "";
    });
}
// Celcius to Fahrenheit converter
const celciusToFahrenheit = temp => temp * 9 / 5 + 32;
