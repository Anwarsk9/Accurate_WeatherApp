import imgs, { months } from "./helper.js";
let city = "nellore";
let form = document.querySelector(".search");
const icon = document.getElementById("icon");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let data = document.getElementById("search");
  city = data.value;
  if (city.length >= 3 && city !== "") {
    try {
      let res = await axios.get(`/weather?city=${city}`);
      if (res.cod == "500") {
        console.log("City not found:", res.message); // Error case
        alert("Error: " + res.message); // Show an alert to the user
      } else {
        res = res.data;
        let mainEl = document.querySelector(".fa-main");
        let description = document.querySelector("#temp p");
        let tempEl = document.querySelector("#temp h1");
        let nameEL = document.querySelector(".timer h2");
        let timeEl = document.querySelector(".timer p");
        let humidityEl = document.querySelector(".humidity h4");
        let windEl = document.querySelector(".wind h4");
        mainEl.style.visibility = "visible";
        tempEl.innerHTML = parseInt(res.main.temp) + "&deg;c";
        windEl.innerHTML = res.wind.speed;
        humidityEl.innerHTML = res.main.humidity;
        nameEL.innerHTML = res.name;
        timeEl.innerHTML = getDate();
        description.innerHTML = res.weather[0].description;
      }
    } catch (error) {
      console.error("An error occurred:", error); // Catch network or other errors
      alert(
        "Invalid City name Entered.\nAn error occurred while fetching data."
      );
    }
  } else {
    alert("please enter a valid city name: ");
  }
  icon.className = "fa-solid";
  icon.classList.add(imgs["sunny"]);
});

const getDate = () => {
  const now = new Date();
  const date = now.getDate();
  const month = months[now.getMonth()];
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  const time = `Today, ${date} ${month} ${hours}:${minutes}${ampm} IST`;
  return time;
};
