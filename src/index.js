import './css/styles.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import { fetchCountries } from "./fetchCountries.js";
const DEBOUNCE_DELAY = 300;


const inputCountry = document.getElementById("search-box")
const countryList = document.getElementsByClassName("country-list")[0]
const countryInfo = document.getElementsByClassName("country-info")[0]

inputCountry.addEventListener("input", debounce(country,300))

function country(e) {
    const countryName = inputCountry.value.trim();
    countryInfo.hidden = true;
    fetchCountries(countryName)        
            
        .then(data => {            
            if (data.length > 10) {
                Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            }
            createHtml(data)             
        }).catch(data => {
            Notify.failure("Oops, there is no country with that name.");
                return;
        })
}

function createHtml(data) {
    clearNewsList()
    let list = "";
    if (data.length > 1) {
        list = data.reduce((markup, country) => createMarkups(country) + markup, "") 
        countryList.insertAdjacentHTML("beforeend", list)   
    } 
    else { 
        list = createMarkup(data[0])
        countryInfo.hidden = false;
        countryInfo.insertAdjacentHTML("beforeend", list)
    };
    
    
}
function createMarkup({ name: { official }, languages, capital, population, flags: { svg } }) {
   const languagesOfficial = Object.values(languages)
  return `
        <div class="country-wrap">
        <img src=${svg} class="country-img">
        <h1 class="country-title">${official}</h1>
        </div>
        <div class="country-text">
        <p><span class="bold">Capital:</span> ${capital}</p>
        <p><span class="bold">Population:</span> ${population}</p>  
        <p><span class="bold">Languages:</span> ${languagesOfficial}</p>
        </div>                 
      
    `;
}
function createMarkups({ name: { official }, flags: { svg } }) {   
  return `
    <li class="country-item">
         <img src=${svg} class="countrys-img">
         <h1 class="country-title">${official}</h1>              
    </li>   
    `;
}


function clearNewsList() {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
}