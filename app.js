//  console.log("Har Har Mahadev");
const apiKey = '217cb8afc2f5e00594ca67d8afd9b950';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?'
const cityName = document.querySelector(".cityName");
const date = document.querySelector(".date");
const input = document.querySelector("#weatherSearch");
const searchBtn = document.querySelector('.search-btn');
const temp = document.querySelector(".temp");
const minTemp = document.querySelector(".min-temp");
const maxTemp = document.querySelector(".max-temp");
const wind = document.querySelector(".wind-value");
const alrt = document.querySelector(".alert");
const titleHeading = document.querySelector(".title > h3");
const futureWeatherItem = document.querySelectorAll(".future-weather-item");
console.log(futureWeatherItem);
window.addEventListener("load", () => {
      setToDefault();
})


searchBtn.addEventListener("click", () => {
     let location = input.value;
     if(location){
          fetchWeather(location);
          setToDefault();
     }
     else{
          displayAlert("Please Enter city name", "danger");
     }
});

function fetchWeather(location){
    const url = `https://api.weatherbit.io/v2.0/current?q=${location}&key=${apiKey}&include=minutely`;
    fetch(url)
        .then((response) => {
             if(response.ok){
                  return response.json();    
             }
             else{
                 throw new Error("Failed to fetch");
             };
        })
        .then(data => {
             console.log(data);
             cityName.textContent = data.name;
             temp.textContent = (data.main.temp).toFixed(1) + "°";
             minTemp.textContent = (data.main.temp_min).toFixed(1) + "°";
             maxTemp.textContent = (data.main.temp_max).toFixed(1) + "°";
             wind.textContent = (data.wind.speed).toFixed(1) + " km/hr";
             const milliseconds = data.dt *1000;
             const dateObj = new Date(milliseconds);
             const dt = dateObj.toDateString();
             date.innerHTML = dt;
             titleHeading.textContent = data.name;
             const fday = `
                <p class="d-date"></p>
                <p class="f-temp"></p>
             `  ;
                       
        })
        .catch(error => {
            console.log("There was a problem with the fetch operation:", error);     
        });   
}
function setToDefault(){
     input.value = "";   
}

function displayAlert(text, action){
    alrt.innerHTML = text;
    alrt.classList.add(`alert-${action}`);
    setTimeout(() => {
         alrt.innerHTML = "";
         alrt.classList.remove(`alert-${action}`);
    }, 2000);
}