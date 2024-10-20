import { getWeather, getForecast } from "./weather.js";

function capitalizeWord(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}

function capitalizePhrase(str) {
    return str.split(' ').map(capitalizeWord).join(' ')
}

async function showWeather() {
    const currentWeather = await getWeather();
    const weatherImageContainer = document.querySelector('.weather-image-container');
    const weatherImg = document.createElement('img');
    weatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`);
    weatherImg.setAttribute('alt', 'The current weather icon');
    weatherImg.setAttribute('width', 150);
    weatherImg.setAttribute('height', 150);
    weatherImageContainer.appendChild(weatherImg);
    const currentWeatherTemperature = document.querySelector('#current-weather-temperature');
    const currentWeatherDescription = document.querySelector('#current-weather-description');
    const currentWeatherDetails = document.querySelector('#current-weather-details');
    currentWeatherTemperature.innerHTML = currentWeather.weather[0].main;
    currentWeatherDescription.innerHTML = capitalizePhrase(currentWeather.weather[0].description);
    const mainData = currentWeather.main;
    currentWeatherDetails.innerHTML = `High: ${Math.round(mainData.temp_max)}°C<br>Low: ${Math.round(mainData.temp_min)}°C<br>Humidity: ${mainData.humidity}%`;    
}

async function showForecast() {
    const forecastData = await getForecast();
    const weatherForecastContainer = document.querySelector('.weather-forecast .content');
    const today = new Date();
    const daysCount = 3;
    const dayForecasts = [];
    for (let i = 0; i < daysCount; i++) {
        const stringDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate() + i}`;
        const list = forecastData.list.filter(e => e.dt_txt.startsWith(stringDate));

        const dayForecast = {
            list,
            // using index 1 to skip first 3 hours
            dayToShow: `${new Date(list[1].dt * 1000).toLocaleString('en-US', { weekday: 'long' })}`,
            img: list[0].weather[0].icon,
            temperature: list[0].main.temp,
            description: capitalizePhrase(list[0].weather[0].description),
        };
        dayForecasts[i] = dayForecast;
    }
    weatherForecastContainer.innerHTML = dayForecasts.map(createForecastContainer).join('');
}

function createForecastContainer(forecast) {
    return `
    <div class="weather-forecast-container">
        <div class="weather-image-container">
            <img src="https://openweathermap.org/img/wn/${forecast.img}@4x.png" alt="The weather icon" width="150" height="150">
        </div>
        <div class="forecast-data">
            <p id="current-weather-temperature">${forecast.dayToShow}</p>
            <p id="current-weather-description">${Math.round(forecast.temperature)}°C</p>
            <p id="current-weather-details">${forecast.description}</p>
        </div>
    </div>
    `;
}

showWeather();
showForecast();