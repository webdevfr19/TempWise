// Get the form and weather data container elements from the HTML
const weatherForm = document.getElementById('weatherForm');
const weatherCity = document.getElementById('city_weather');
const weatherTemperature = document.getElementById('city_temperature');
const weatherCountry = document.getElementById('city_country');
const humidity = document.getElementById('humidity');
const weatherRegion = document.getElementById('city_region');
const weather = document.getElementById('weather');
const windDirection = document.getElementById('weather_wind_dir');

const addPage = document.getElementById('addPage');

weatherTemperature.addEventListener('click', function(){
    addPage.classList.toggle('visible');
    weatherTemperature.classList.toggle('visible');
    // if(addPage.style.display == 'none'){
    //     weatherCity.style.textAlign = 'left';
    //     addPage.style.display = 'block';
    //     addPage.classList.toggle('visible');
    // }
    // else{
    //     weatherCity.style.textAlign = 'center';
    //     addInformation.style.display = 'none';
    // }
})

// Add an event listener to the form to handle the API request
weatherForm.addEventListener('submit', getWeatherData);

// Function to fetch weather data from the OpenWeatherMap API
function getWeatherData(event) {
    event.preventDefault();
    window.scrollBy(0, window.innerHeight);
    event.preventDefault();
    const apiKey = '93344993f98a430a92123853232307'; // Replace with your actual OpenWeatherMap API key
    const city = document.getElementById('city').value;

    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
//   http://api.weatherapi.com/v1/current.json?key=<YOUR_API_KEY>&q=London

    fetch(apiUrl)
        .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
        })
        .then((data) => {
            weatherCity.innerHTML = data.location.name;
            weatherTemperature.innerHTML = data.current.temp_c;
            weatherCountry.innerHTML = data.location.country;
            // switch case for bgcolor changing
            // switch(data.current.temp_c){
            //     case(data.current.temp_c >= 25):
            //         weatherTemperature.style.backgroundColor = '#EF7474';
            //     case(data.current.temp_c <= 25):
            //         weatherTemperature.style.backgroundColor = '#7895CB';
            // }

            // if else idk sana magwork lol
            if(data.current.temp_c >= 25){
                weatherTemperature.style.backgroundColor = '#EF7474';
            }else if(data.current.temp_c <= 25){
                weatherTemperature.style.backgroundColor = '#7895CB';
            }
        })
        .catch((error) => {
        weatherDataContainer.innerHTML = 'Error: ' + error.message;
    });
}

// scroll function in enter

document.addEventListener('DOMContentLoaded', function() {
    function handleKeyPress(event) {
      if (event.key === 'Enter') {
        event.preventDefault();
        window.scrollBy(0, window.innerHeight); 
        event.preventDefault();
        const apiKey = '93344993f98a430a92123853232307'; 
        const city = document.getElementById('city').value;
        const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
        fetch(apiUrl)
            .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); 
            })
            .then((data) => {
                weatherCity.innerHTML = `City: ${data.location.name}`;
                weatherTemperature.innerHTML = `${data.current.temp_c}\u00B0`;
                weatherCountry.innerHTML =`Country: ${data.location.country}`;
                weatherRegion.innerHTML = `Continent: ${data.location.tz_id}`;
                weather.innerHTML = `Weather: ${data.current.condition.text}`;
                windDirection.innerHTML = `Wind Direction: ${data.current.wind_dir}`;
                humidity.innerHTML = `Humidity: ${data.current.humidity}`;
                // switch case for bgcolor changing
                // switch(data.current.temp_c){
                //     case(data.current.temp_c >= 25):
                //         weatherTemperature.style.backgroundColor = '#EF7474';
                //     case(data.current.temp_c <= 25):
                //         weatherTemperature.style.backgroundColor = '#7895CB';
                // }
                console.log(data.location.name);
            if(data.current.temp_c >= 25){
                weatherTemperature.style.backgroundColor = '#EF7474';
            }else if(data.current.temp_c <= 25){
                weatherTemperature.style.backgroundColor = '#7895CB';
            }
            })
            .catch((error) => {
            weatherDataContainer.innerHTML = 'Error: ' + error.message;
            });
        }
    }
    document.addEventListener('keydown', handleKeyPress);
});

