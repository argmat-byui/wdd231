import { getWeather, getForecast } from "./weather.js";
import { getDirectory } from "./get-directory.js";

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

function getMembership (item) {
    return ['Bronze', 'Silver', 'Gold'][item.level-1];
}

function createCard (item) {
	return `
			<div class="item-card">
				<img class="hover" src="${item.imageUrl}" loading="lazy" height="167" width="auto" alt="Córdoba temple">
                    <h2>${item.name}</h2>
                    <span class="card-value">${item.address}</span>
					<span class="card-value">${item.phoneNumber}</span>
                    <span class="card-value"><a href="${item.websiteUrl}">Website</a></span>
                    <span class="card-value">Membership: ${getMembership(item)}</span>
            </div>
		   `
}

function getRandom(array, count=1) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

async function initDirectoryPreview() {
    const directory = await getDirectory();
    showDirectoryPreview(getRandom(directory.filter(e => e.level >= 2), 3));
}

const cardsContainer = document.querySelector('.directory-preview');

const showDirectoryPreview = (directory, filterFn = () => true) => {
	const cards = directory.filter(filterFn).map(createCard);
    console.log('cards', cards);
	cardsContainer.innerHTML = cards.join('');
}

showWeather();
showForecast();

initDirectoryPreview();