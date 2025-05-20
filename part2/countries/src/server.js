import axios from 'axios'



const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/'

const getAllCountries = () => {
     return axios.get(baseUrl + 'api/all').then(response => response.data);
}

const getOneCountry = (term) => {
    return axios.get(baseUrl + `api/name/${term}`).then(response => response.data);
}

const getWeather = (country) => {
    const api_key = import.meta.env.VITE_API_WEATHER_KEY
    const capital = country.capital[0]
 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${api_key}`;

    return axios.get(url).then(response => response.data);
}



export default {getAllCountries,getOneCountry, getWeather}