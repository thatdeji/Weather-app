class Weather {
  constructor() {
    this.apiKey = "cd4c576800f8030c4871b47a89f506f8";
    this.city = city;
  }
  // Get weather from API
  async getWeather() {
    const weather = await fetch(`https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`);

    const response = await weather.json();

    return response;
  }
  //Change weather location
  changeLocation(city) {
    this.city = city;
  }
}