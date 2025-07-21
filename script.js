const API_KEY = '810120b0fb8a3f3399ca13da5c58eb5d';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const resultSection = document.getElementById('weather-result');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const city = cityInput.value.trim();
        if (!city) {
            displayError('Please enter a city name.');
            return;
        }
        resultSection.innerHTML = '<div class="weather-box">Loading...</div>';
        try {
            const data = await getWeatherData(city);
            console.log(data); // <-- Add this line
            if (data.cod !== 200) {
                displayError(data.message ? data.message : 'City not found.');
            } else {
                displayWeather(data);
            }
        } catch (error) {
            displayError('Unable to fetch weather data.');
        }
    });

    function displayError(message) {
        resultSection.innerHTML = `<div class="weather-box" style="color:#e11d48">${message}</div>`;
    }
});

async function getWeatherData(city) {
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const response = await fetch(endpoint);
    return await response.json();
}

function displayWeather(data) {
    const resultSection = document.getElementById('weather-result');
    const condition = data.weather[0].main;
    const temperature = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const cityName = data.name;

    resultSection.innerHTML = `
        <div class="weather-box">
            <div class="weather-condition">${condition}</div>
            <div class="weather-temp">${temperature}&deg;C</div>
            <div class="weather-humidity">Humidity: ${humidity}%</div>
            <div class="weather-city">${cityName}</div>
        </div>
    `;
}