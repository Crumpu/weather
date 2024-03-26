'use strict';
const inputs = document.getElementById('idOrName');
const radioBtn = document.getElementById('changeMethod');
const btnWeather = document.getElementById('btnWeather');
const divTemp = document.getElementById('divTemp');
const divWindSpeed = document.getElementById('divWindSpeed');
const divHumidity = document.getElementById('divHumidity');

let yourCity;
let weatherFor;

class Param {
  constructor(cityId, cityName) {
    this.cityId = cityId;
    this.cityName = cityName;
  }
}

function getValue() {
  const cityInfo = inputs.querySelectorAll('input');
  const arrayCityInfo = Array.from(cityInfo).map((el) => el.value);
  yourCity = new Param(...arrayCityInfo);
  console.log(yourCity);
  choiceMethod();
  return yourCity;
}

function choiceMethod() {
  const radioChecked = radioBtn.querySelector('input:checked');
  const idInput = document.getElementById('inputId');
  const nameInput = document.getElementById('inputName');
  console.log(radioChecked.id);
  if (!yourCity) {
    getValue();
  } else {
    if (radioChecked.id === 'cityName') {
      nameInput.removeAttribute('disabled');
      idInput.value = '';
      weatherFor = `q=${yourCity.cityName}`;
      idInput.setAttribute('disabled', 'disabled');
    } else {
      idInput.removeAttribute('disabled');
      nameInput.value = '';
      weatherFor = `id=${yourCity.cityId}`;
      nameInput.setAttribute('disabled', 'disabled');
    }
    console.log(weatherFor);
    return weatherFor;
  }
}

function getWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?${weatherFor}&units=metric&APPID=fbdc53e777270dc02e9feb36e9387389`
  )
    .then((weather) => {
      console.log(weather);
      if (!weather.ok) throw new Error('Error');
      return weather.json();
    })
    .then((data) => {
      divHumidity.innerHTML = '';
      divWindSpeed.innerHTML = '';
      divTemp.innerHTML = '';
      const temp = data.main.temp;
      divTemp.innerHTML = `<span class="weatherData">${temp}°C</span>`;
      const windSpeed = data.wind.speed;
      divWindSpeed.innerHTML = `<span class="weatherData">${windSpeed}m/s</span>`;
      const humidity = data.main.humidity;
      divHumidity.innerHTML = `<span class="weatherData">${humidity}%</span>`;
    })
    .catch((error) => {
      console.log(error);
    });
}

inputs.addEventListener('change', getValue);
radioBtn.addEventListener('change', choiceMethod, getValue);
btnWeather.addEventListener('click', getWeather);
