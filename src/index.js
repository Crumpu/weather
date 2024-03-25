'use strict';
const inputs = document.getElementsByClassName('textInputs');
const nn = inputs.childNodes;
console.log(nn)
let ourCity;

class Param {
  constructor(cityId, cityName) {
    this.cityId = cityId;
    this.cityName = cityName;
  }
}

function getValue(e) {
    // e.target
    const cityInfo = inputs.querySelectorAll('input');
    const arrayCityInfo = Array.from(cityInfo).map((el) => el.value)
  const inputsValue = new Param(...arrayCityInfo);

  console.log(inputsValue);
}

// const param = {
//   url: 'https://api.openweathermap.org/data/2.5/weather?',
//   appid: 'fbdc53e777270dc02e9feb36e9387389',
//   cityName: '',
// };

inputs.addEventListener('change', getValue);
