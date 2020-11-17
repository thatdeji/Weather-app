class Storage {
  constructor() {
    this.temp;
  }
  getState() {
    let result;
    let temp = document.querySelector('.toggle-btn');
    temp.classList.contains('active') ? result = 'fahrenheit' : result = 'celcius';
    return result;
  }
  getDegrees() {
    if(localStorage.getItem('temp') === null) {
      this.temp = this.getState();
    }
    else {
      this.temp = localStorage.getItem('temp');
    }
    return this.temp;
  }
  setDegrees() {
    localStorage.setItem('temp', this.getState());
  }
}