const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apikey = "a2d3f30a36d8461ab80135047252702";

weatherForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const city = cityInput.value;

  if (city) {
    try {
      const weatherData = await getWeatherData(city);
      displayWeatherInfo(weatherData);
    } catch (error) {
      console.error(error);
      displayError(error);
    }
  } else {
    displayError("Please enter a city");
  }
});

async function getWeatherData(city) {
  const weatherUrl = `http://api.weatherapi.com/v1/current.json?key=${apikey}&q=${city}&aqi=no`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  if (!weatherResponse.ok) {
    throw new Error("City not found. Please enter a valid city.");
  }

  console.log("Weather Data: ", weatherData);

  return weatherData;
}

function displayWeatherInfo(data) {
  const {
    location: { name: city },
    current: {
      condition: { text, icon },
      temp_c,
      humidity,
    },
  } = data;

  card.textContent = "";
  card.style.display = "flex";

  const cityDisplay = document.createElement("h1");
  const tempDisplay = document.createElement("p");
  const humDisplay = document.createElement("p");
  const descDisplay = document.createElement("p");
  const emojiDisplay = document.createElement("img");
  // const cityDisplay = document.createElement("p");

  cityDisplay.textContent = city;
  tempDisplay.textContent = `${temp_c}°`;
  humDisplay.textContent = `Humidity is ${humidity}%`;
  descDisplay.textContent = text;
  emojiDisplay.src = `https:${icon}`;

  cityDisplay.classList.add("cityDisplay");
  tempDisplay.classList.add("tempDisplay");
  humDisplay.classList.add("humDisplay");
  descDisplay.classList.add("descDisplay");

  emojiDisplay.classList.add("emojiDisplay");
  emojiDisplay.alt = text; // Set alt text for accessibility
  // emojiDisplay.style.width = "50px"; // Adjust size if needed

  card.appendChild(cityDisplay);
  card.appendChild(tempDisplay);
  card.appendChild(humDisplay);
  card.appendChild(descDisplay);
  card.appendChild(emojiDisplay);
}

function getWeatherEmoji(weatherID) {}

function displayError(message) {
  const errorDisplay = document.createElement("p");
  errorDisplay.textContent = message;

  errorDisplay.classList.add("errorDisplay");

  card.textContent = "";
  card.style.display = "flex";
  card.appendChild(errorDisplay);
}
