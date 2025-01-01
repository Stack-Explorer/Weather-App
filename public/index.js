const apiKey = "fef8b7abca5f1d2995a8cba9bd168059";

$(document).ready(function (){
    $("#search-btn").click(function (){
        const city = $("#city-input").val().trim();
        if(city){
            getWeatherData(city);
        } else {
            alert("Please Enter a city name.");
        }
    });
});

function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    $.get(apiUrl,function (data){
        console.log(data);

        if(data.cod == 200){
            $("#city-name").text(`City : ${data.name}`);
            $("#temperature").text(`Temperature : ${data.main.temp} °C`);
            $("#description").text(`Description : ${data.weather[0].description}`);
            $("#humidity").text(`Humidity : ${data.main.humidity}%`)
        } else {
            alert("City not found.Please check the city name.")
        }
    }).fail(function (){
        alert("Error fetching data. Please try again.");
    });
}