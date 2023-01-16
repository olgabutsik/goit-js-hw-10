import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCoutries';
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const inputArea = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

inputArea.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function countryCard(country) {
    // console.log(country);
    const card = country.map(({ flags, name, capital, population, languages }) => {
        return `<li><img src="${
          flags.svg
        }" alt="flag of country"> <h1>${name}</h1></li>
      <li><h3>Capital: </h3>${capital}</li>
      <li><h3>Population: </h3>${population}</li>
      <li><h3>Languages:</h3> ${languages
        .map(({ name }) => name)
        .join(', ')}</li>
     `;
    }).join("")
    
    countryList.innerHTML = '';
    
    countryInfo.innerHTML = card;
}


function onSearch(evt) {
    evt.preventDefault();
    const inputCountry = evt.target.value.trim();
    if (!inputArea.value) {
        countryList.innerHTML = '';
        countryInfo.innerHTML = '';
        return;
    }
      if (onSearch) {
        fetchCountries(inputCountry)
          .then(res => {
            if (res.length > 10) {
              Notify.info(
                'Too many matches found. Please enter a more specific name.'
              );
              return;
            } else if (res.length >= 2 && res.length <= 10) {
              countryCard(res);
              return;
            } else if (res.length === 1) {
              countryCard(res);
              return;
            }
          })
          .catch(error => {
            Notify.failure('Oops, there is no country with that name');
          });
      }
}














