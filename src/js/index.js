import { getCity, getWeather, citySearch } from "./forecast";
import day from "./../assets/img/day.svg";
import night from "./../assets/img/night.svg";

const form = document.querySelector(".change-location");
const list = document.getElementById("dataList");
let timeOut = null;
const input = form.city;
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const fillOption = (city, country) => {
  console.log(city);
  let html = `<option value=${city} >${country}</option>`;
  list.innerHTML += html;
};

const updateUI = ({ cityDetails, weather }) => {
  // update Details
  details.innerHTML = `<h5 class="my-3 color-red font-weight-bold myText">${cityDetails.EnglishName}</h5><div class="my-3 color-black">${weather.WeatherText}</div><div class="display-4 my-4"><span>${weather.Temperature.Metric.Value}</span><span>&deg;C</span></div>`;

  // Update the night/day & icon images
  const iconSrc = `./icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  weather.IsDayTime ? (timeSrc = day) : (timeSrc = night);
  time.setAttribute("src", timeSrc);

  // display block
  if (card.classList.contains("d-none")) card.classList.remove("d-none");
};

const updateCity = async (city) => {
  const cityDetails = await citySearch(city);
  const weather = await getWeather(cityDetails.Key);
  input.disabled = false;
  return { cityDetails, weather };
};

const updateWeather = (city) => {
  localStorage.setItem("city", city);
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
};

const init = () => {
  const city = localStorage.city;

  city !== null
    ? updateCity(city)
        .then((data) => updateUI(data))
        .catch((err) => console.log(err))
    : null;
};

input.addEventListener("keyup", (e) => {
  const search = e.target.value.trim().toLowerCase();
  clearTimeout(timeOut);

  timeOut = setTimeout(() => {
    getCity(search)
      .then((data) =>
        data.forEach((e) => {
          // console.log(e);
          // let key = e.Key;
          let city = e.LocalizedName.replace(" ", "&#032;");
          let country = e.Country.LocalizedName;
          fillOption(city, country);
        })
      )
      .catch((err) => console.log(err));
  }, 1000);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearTimeout(timeOut);
  input.disabled = true;
  const value = input.value;
  if (!value) return;
  form.reset();
  updateWeather(value);
});

init();
