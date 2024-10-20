const lat = -34.6037;
const lon = -58.516;
const units = 'metric';
const appid = '8ac0a2976ca56e93159583dd1d628144';

async function getForecast() {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`;
    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch (err) {
        console.log(err);
    }
}

async function getWeather() {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${appid}`;
    try {
        const response = await fetch(url);
        return await response.json();
    }
    catch (err) {
        console.log(err);
    }
}

export { getForecast, getWeather };