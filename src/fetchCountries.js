// https://restcountries.com/v3.1/name/{name}

const ENDPOINT = "https://restcountries.com/v3.1";
const options = "name,capital,population,flags,languages"
function fetchCountries(name) {
    const url = `${ENDPOINT}/name/${name}?fields=${options}`;
    // const url = `${ENDPOINT}/name/ukr?fields=${options}`;
    
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {       
        return data;
      });

}


export  {fetchCountries}