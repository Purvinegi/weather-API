const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");


const apikey = '950cc1067b7043878be172636252009';

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) getWeather(city);
});

// Event: Press Enter
cityInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) getWeather(city);
  }
});

// Fetch weather data
async function getWeather(city) { // Corrected: only needs 'city' parameter
  const endpoint = 'weather'; // Corrected: hard-coded endpoint for current weather
  // Corrected: use backticks (`) for template literals and correct variable names
  const url = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found ❌");

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherResult.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

// Display weather data
function displayWeather(data) {
  weatherResult.innerHTML = `
    <h2>${data.location.name}</h2>
    <p>🌡️ Temperature: ${data.current.temp_c}°C</p>
    <p>💧 Humidity: ${data.current.humidity}%</p>
    <p>💨 Wind Speed: ${(data.current.wind_kph * 0.27).toFixed(2)} m/s</p>
  `;
}