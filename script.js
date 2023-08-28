// state
let currCity = "Kakinada";
let units = "metric";

// Selectors
let city = document.querySelector(".weather_city");
let datetime = document.querySelector(".weather_datetime");
let weather_forecast = document.querySelector('.weather_forecast');
let weather_temperature = document.querySelector(".weather_temperature");
let weather_icon = document.querySelector(".weather_icon");
let weather_minmax = document.querySelector(".weather_minmax")
let realfeel = document.querySelector('.real_feel');
let humidity = document.querySelector('.humidity');
let wind = document.querySelector('.wind');
let pressure = document.querySelector('.pressure');
let weather_units=document.querySelectorAll(".weather_units");
// search
document.querySelector(".weather_search").addEventListener('submit', e => {
    let search = document.querySelector(".weather_searchform");
    // prevent default action
    e.preventDefault();
    // change current city
    currCity = search.value;
    // get weather forecast 
    getWeather();
    // clear form
    search.value = ""
})

// units
document.querySelector(".weather_unit_celsius").addEventListener('click', () => {
    if(units !== "metric"){
        // change to metric
        units = "metric";
        // get weather forecast 
        getWeather();
    }
})

document.querySelector(".weather_unit_farenheit").addEventListener('click', () => {
    if(units !== "imperial"){
        // change to imperial
        units = "imperial";
        // get weather forecast 
        getWeather();
    }
})

//units bgcolor onclick
function changeBackgroundColor(weather_units) {
    const celsiusButton = document.querySelector(".weather_unit_celsius");
    const fahrenheitButton = document.querySelector(".weather_unit_farenheit");

    if (weather_units === fahrenheitButton) {
        celsiusButton.style.background = "none"; // Reset background of the Celsius button
        fahrenheitButton.style.background = "linear-gradient(to right, #ffbf80, #e67300)";
       
    } 
    else if (weather_units === celsiusButton) {
        fahrenheitButton.style.background = "none"; // Reset background of the Fahrenheit button
        celsiusButton.style.background = "linear-gradient(to right, #ffbf80, #e67300)";
        
    }
}


function convertTimeStamp(timestamp, timezone) {
    const date = new Date(timestamp * 1000);
    
    // Calculate the UTC time in milliseconds
    const utcTime = date.getTime() + (date.getTimezoneOffset() * 60 * 1000);

    // Calculate the local time by adding the timezone offset in milliseconds
    const localTime = utcTime + (timezone * 1000);

    // Create a new Date object using the local time
    const localDate = new Date(localTime);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    };

    return localDate.toLocaleString("en-US", options);
}


// convert country code to name
function convertCountryCode(country) {
    // Create an instance of Intl.DisplayNames with the locale set to "en" (English)
    // and type set to "region" to handle region names (countries)
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    
    // Use the `of` method of the regionNames object to get the region name for the given country code
    return regionNames.of(country);
}

//.toFixed(): The toFixed() method is a JavaScript function that is applied to a number to format it with a fixed number of decimal places. In this case, it appears that you're using it with data.main.feels_like to format the "real feel" temperature to a whole number (no decimal places).
function getWeather(){
    const api_key = '44fc76793279dbacff9b965bef7e7329';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currCity}&appid=${api_key}&units=${units}`).then(res => res.json()).then(data => {
    console.log(data);
    city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
    datetime.innerHTML = convertTimeStamp(data.dt, data.timezone); 
    weather_forecast.innerHTML = `<p>${data.weather[0].main}`;
    weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`;
    weather_icon.innerHTML = `   <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`
    weather_minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p><p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
    realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
    humidity.innerHTML = `${data.main.humidity}%`;
    wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}`;
    pressure.innerHTML = `${data.main.pressure} hPa`;
})
};

document.body.addEventListener('DOMContentLoaded', getWeather());