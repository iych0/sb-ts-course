class Renderer {
  BASE_WEATHER_URL = [`http://api.weatherapi.com/v1/current.json?key=fadcea1f63d545f7910163328241712&q=`, `%aqi=no`]
  BASE_FORECAST_URL = [`http://api.weatherapi.com/v1/forecast.json?key=fadcea1f63d545f7910163328241712&q=`, `&days=1&aqi=no&alerts=no`]

  async fetchCurrentDataByCity(city, type) {
    const rawResponse = type === 'current'
      ? await fetch(`${this.BASE_WEATHER_URL[0]}${city}${this.BASE_WEATHER_URL[1]}`)
      : await fetch(`${this.BASE_FORECAST_URL[0]}${city}${this.BASE_FORECAST_URL[1]}`)
    const jsonResponse = await rawResponse.json();
    console.log(jsonResponse);
    return jsonResponse;
  }

  onCitySubmit = async () => {
    if (document.querySelector('.current-weather').innerHTML !== '') {
      await this.clearWeather()
    }

    const locationInputValue = locationInput.value;

    const currentWeatherData = await this.fetchCurrentDataByCity(locationInputValue, 'current');
    const forecastData = await this.fetchCurrentDataByCity(locationInputValue, 'forecast');

    await this.renderWeather(
      `http:${currentWeatherData.current.condition.icon}`,
      currentWeatherData.current.temp_c,
      currentWeatherData.current.condition.text,
    );

    console.log(forecastData.forecast.forecastday[0])
    await this.renderForecast(forecastData.forecast.forecastday[0])
  };

  async createCustomElement(elementType, elementClass, elementImgUrl = null, elementInner = null) {
    const element = document.createElement(elementType);
    element.setAttribute('class', elementClass);
    if (elementInner !== null) {
      element.innerHTML = elementInner;
    } else {
      element.setAttribute('src', elementImgUrl);
    }
    return element;
  }

  async renderWeather(iconUrl, temp, status) {
    const weatherIconElement =
      this.createCustomElement('img', 'current-weather__icon', iconUrl, null);
    const weatherTemperatureElement =
      this.createCustomElement('span', 'current-weather__temp', null, `${temp}°С`);
    const weatherStatusElement =
      this.createCustomElement('span', 'current-weather__description', null, status);

    const weatherElement = document.querySelector('.current-weather');
    weatherElement.appendChild(await weatherIconElement);
    weatherElement.appendChild(await weatherTemperatureElement);
    weatherElement.appendChild(await weatherStatusElement);
  }

  async createForecastElement(iconUrl, time, temp) {
    const timeElement =
      this.createCustomElement('span', 'forecast-item__time', null, time)
    const iconElement =
      this.createCustomElement('img', 'forecast_icon', iconUrl, null)
    const tempElement =
      this.createCustomElement('span', 'forecast-item__temp', null, `${temp}°С`)

    const forecastElement = document.createElement('div')
    forecastElement.setAttribute('class', 'forecast-item')
    forecastElement.appendChild(await timeElement)
    forecastElement.appendChild(await iconElement)
    forecastElement.appendChild(await tempElement)

    return forecastElement
  }

  async renderForecast(data) {
    const forecastData = data.hour
    const forecastContainer = document.querySelector('.forecast')
    for (const item of forecastData) {
      console.log(item)
      const elem = this.createForecastElement(
        item.condition.icon,
        item.time.slice(11),
        item.temp_c
      )
      await forecastContainer.appendChild(await elem)
    }
  }

  async clearWeather() {
    const weather = document.querySelector('.current-weather')
    weather.innerHTML = ''
    const forecast = document.querySelector('.current-weather')
    forecast.innerHTML = ''
  }
}

const renderer = new Renderer();

const locationInput = document.querySelector('.input-block__input');
const locationButton = document.querySelector('.input-block__button');
locationButton.addEventListener('click', renderer.onCitySubmit);