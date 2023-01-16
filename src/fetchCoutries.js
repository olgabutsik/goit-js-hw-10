

export function fetchCountries(name) {
   
  return fetch(
    `https://restcountries.com/v2/name/${name}?fields=flags,name,capital,population,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}




  
  
