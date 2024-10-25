document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '79e3918a7e6b8b2d2a81bbbdb8241377';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    showLoading(true);

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found, enter a valid city');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        displayError(error.message);
    } finally {
        showLoading(false);
    }
}

function showLoading(isLoading) {
    const loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = isLoading ? 'block' : 'none';
}

function displayWeather(data) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

function displayError(message) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `<p>${message}</p>`;
}
