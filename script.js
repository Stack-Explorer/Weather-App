const apiKey = "Your_API_Key";

$(document).ready(function() {
  // Handle search button click event
  $('#searchButton').click(function() {
    const city = $('#city').val().trim();

    if (!city) {
      alert('Please enter a city name!');
      return;
    }

    // Fetch weather data using OpenWeatherAPI
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
      method: 'GET',
      success: function(data) {
        if (data.cod !== 200) {
          alert('City not found! Please enter a valid city name.');
          return;
        }
        displayWeather(data);
      },
      error: function() {
        alert('Error fetching weather data!');
      }
    });

    // Fetch 5-day forecast;
  });

  // Function to display weather data
  function displayWeather(data) {
    $('#cityName').text(data.name);
    $('#temperature').html(`${data.main.temp} °C <span class="temp-unit">(${celsiusToFahrenheit(data.main.temp)} °F)</span>`);
    $('#description').text(data.weather[0].description);
    $('#humidity').text(`Humidity: ${data.main.humidity}%`);
    $('#windSpeed').text(`Wind Speed: ${data.wind.speed} m/s`);
    $('#precipitation').text(`Precipitation: ${data.rain ? data.rain['1h'] : 0} %`);

    // Highlight location
    $('#cityName').addClass('highlight');
  }

  // Function to convert Celsius to Fahrenheit
  function celsiusToFahrenheit(celsius) {
    return ((celsius * 9/5) + 32).toFixed(2);
  }})