const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const mycity = document.querySelector(".city") ;
const mytemp = document.querySelector(".temp");
const minAndMaxTemp = document.querySelector(".min-max") ;
const myhumidity =  document.querySelector(".humidity") ;
const myicon =  document.querySelector(".icon") ;
const mydescription = document.querySelector(".description");
const windSpeed = document.querySelector(".windSpeed") ;

const API_Key = '614a99dbb9038b4b0c07694fbad85707';
searchBtn.addEventListener('click', searchField);

function searchField(){
  clearCards();
  const searchTerm = searchInput.value;
  getWeather(searchTerm);
}
function getWeather(searchTerm){
  fetch(` https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${API_Key}`)
  .then(result => result.json())
  .then(data => {
    const {name :city} = data ;
    const {country} = data.sys ;
    const {temp , temp_min : min , temp_max : max , humidity  } = data.main ;
    const {icon ,description } = data.weather[0];
    const {speed}  = data.wind ;

    updateWeather(city, country,temp ,min , max , humidity ,icon , description ,speed  );
    })
     .catch(() => console.log(Error('An Error Occured!')));
}
function updateWeather(city, country,temp ,min , max , humidity ,icon , description ,speed ) {
    mycity.innerHTML = `Weather in ${city},${country}` ;
    myicon.src = `https://openweathermap.org/img/wn/${icon}.png` ;
    mytemp.innerHTML = `${temp.toFixed(0)}<span class="celsius">°C</span>` ;
    minAndMaxTemp.innerHTML = `Min:${min.toFixed(0)} &nbsp&nbsp Max:${max.toFixed(0)}` ;
    myhumidity.innerHTML = `Humidity: ${humidity}%` ;
    mydescription.innerHTML = `${description}` ;
    windSpeed.innerHTML = `Wind: ${speed.toFixed(1)} Km/h` ;
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + city + "')";
}
function clearCards() {
  mycity.innerHTML = "";
  myicon.innerHTML = "";
  mytemp.innerHTML = "";
  minAndMaxTemp.innerHTML = "";
  myhumidity.innerHTML = "";
  mydescription.innerHTML = "";
  windSpeed.innerHTML = "";
}
