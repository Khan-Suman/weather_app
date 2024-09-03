const apiURL = "https://api.weatherapi.com/v1/current.json?key=dab9873bcfde4954a07102437240309&q=Chennai"

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherCondition = document.querySelector(".condition");

async function checkWeather(city) {
   const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=dab9873bcfde4954a07102437240309&q=${city}`);
   var data = await response.json();

   console.log(data);

   document.querySelector(".city").innerHTML = data.location.name;
   document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
   document.querySelector(".temp").innerHTML = data.current.temp_c + "°C";
   document.querySelector(".wind").innerHTML = data.current.wind_kph + " km/h";
   document.querySelector(".condition").innerHTML = data.current.condition.text;

   weatherIcon.src = data.current.condition.icon;

   
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})

