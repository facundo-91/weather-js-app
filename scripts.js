// Selectors
let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-btn');
let weatherMain = document.querySelector('#weather-main');
let weatherCity = document.querySelector('#weather-city');
let weatherTemp = document.querySelector('#weather-temp');
let weatherDescription = document.querySelector('#weather-description');
let weatherIcon = document.querySelector('#weather-icon');
let weatherPressure = document.querySelector('#weather-pressure');
let weatherHumidity = document.querySelector('#weather-humidity');

function fetchWeather() {
	const apiKey = "eae61422270d89bd7c448c2fed80ff59";
	let cityName = searchInput.value;
	let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
	// Create XHR Object
	let request = new XMLHttpRequest();
	// Open(Method, url, async)
	request.open('GET', url, true);
	// Function when request completes
	request.onload = function() {
		if (this.status === 200) {
			let response = JSON.parse(this.responseText);
			weatherCity.innerHTML = response.name + ", " + response.sys.country;
			weatherIcon.src = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
			weatherIcon.alt = response.weather[0].description;
			weatherTemp.innerHTML = Math.round(response.main.temp) + "ºC";
			weatherDescription.innerHTML = response.weather[0].main;
			weatherPressure.innerHTML = "Pressure: " + Math.round(response.main.pressure) + " hPa";
			weatherHumidity.innerHTML = "Humidity: " + response.main.humidity + " %";
			weatherMain.style.display = 'block';
		} else if (this.status === 404) {
				alert('City Name not Found');
		}
	}
	// Send request
	request.send();
	// Clear input after search
	searchInput.value = '';
}

// Events Listeners
searchButton.addEventListener('click', fetchWeather);
searchInput.addEventListener('keydown', function(e) {
	if (e.key === 'Enter') {
		fetchWeather();
	}
});