class UI{
  constructor() {
    this.weatherResult = document.getElementById('weather-result');
    this.toggleBtn = document.querySelector('.toggle-btn');
    this.loader = document.getElementById('loading');
    this.celcius;
  }
  paint(weather, temp) {
    let temperature;
    this.celcius = Math.round(300 - weather.main.temp);
    if(temp === 'celcius') {
      temperature = `<h3 id = 'temp-result'><span id="temp-no">${this.celcius}</span> <sup>°C</sup></h3>`;
    } else {
      temperature= `<h3 id = 'temp-result'><span id="temp-no">${Math.floor(celciusToFahrenheit(this.celcius))}</span> <sup>°F</sup></h3>`;
    }
    let template;
    template = `
      <div class=" weather-result-card-wrapper py-5">
        <h1 class="text-center"><span>${weather.name}</span>  <span class="country">${weather.sys.country}</span></h1>
        <div class="flex-center space-around flex-start">
        <div class="weather-result-card px-5 py-5 text-center">
          <h2>Temperature</h2>
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather.weather[0].icon}.svg" alt="Weather description" alt="Weather description">
          ${temperature}
        </div>
        <div class="weather-result-card px-5 py-5 text-center">
          <h2>Humidity</h2>
          <img src="assets/img/humidity.jpg" alt="Weather humidity">
          <h3>${weather.main.humidity} <sup>%</sup></h3>
        </div>
        <div class="weather-result-card px-5 py-5 text-center">
          <h2>Pressure</h2>
          <img src="assets/img/pressure.png" alt="Weather pressure">
          <h3>${weather.main.pressure} <sup>atm</sup></h3>
        </div>
        </div>
        <div class="text-center">
          <p class="weather-desc">${weather.weather[0].description}</p>
        </div>
      </div>   
    `
    this.weatherResult.innerHTML = template;
  }
  toggle(temp) {
    if (temp === 'celcius') {
      this.toggleBtn.classList.remove('active');
    } else {
      this.toggleBtn.classList.add('active');
    }
  }
  changeTemp(temp) {
    let tempNo = Number(document.getElementById('temp-no').textContent);
    let tempResult = document.getElementById('temp-result')
    if(temp === 'fahrenheit') {
      this.celcius = document.getElementById('temp-no').textContent;
      tempResult.innerHTML = `<span id="temp-no">${Math.floor(celciusToFahrenheit(tempNo))}</span> <sup>°F</sup>`;
    } else {
      tempResult.innerHTML = `<span id="temp-no">${this.celcius}</span> <sup>°C</sup>`; 
    }
  }
  openLoader() {
    this.loader.classList.remove('none');
  }
  removeLoader() {
    this.loader.classList.add('none');
  }
  error(msg) {
    let message = `
      <div class="error-message text-center">${msg}</div>
    `
    this.weatherResult.innerHTML = message;
  }  
}