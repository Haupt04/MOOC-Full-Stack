import { useEffect, useState } from "react"
import ButtonHandle from "./ButtonHandle"
import Server from '../server.js'

const FilterAnswers = ({countries, searchTerm}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [countryInfo, setCountryInfo] = useState({})
  const filterCountries = countries.filter(country => (
  country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  useEffect(() => {
    if (!selectedCountry) return;

    Server.getWeather(selectedCountry).then(data => {
      setCountryInfo(data)
    })
    },[selectedCountry])

    useEffect(() => {
    if (filterCountries.length === 1) {
      Server.getWeather(filterCountries[0]).then((data) => {
        setCountryInfo(data);
      });
    }
  }, [filterCountries]);
  
  
    
 

  const handleClick = (country) => {
    setSelectedCountry(country)
  }


  if (searchTerm == "") {
    return null
  }

  if (filterCountries.length > 10){
    return (
      <div>
        <p>Too many matches,specify another filter</p>
      </div>
    )
  }
  
  if (selectedCountry){
    return (
      <div>
      <ButtonHandle country={selectedCountry} weather={countryInfo}/>
      <button onClick={() => {
        setSelectedCountry(null); 
        setCountryInfo([]);
        }}>Back</button>
    </div>
    )
  }
  
  if (filterCountries.length <= 10 && filterCountries.length > 1 ){
    return (
      <div>
      {filterCountries.map((country,index) => (
        <div key={index}>
          <p>{country.name.common}</p> 
          <button onClick={() => handleClick(country)}>Show</button>
        </div>
      ))}
      </div>
    )
  } else if (filterCountries.length == 1){
    const country = filterCountries[0]
    const listLanguages = Object.values(country.languages)
    return (
      <>
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <p>Area: {country.area}</p>
          <h3>Languages</h3>
          <ul>
            {listLanguages.map((lang,index) => (
              <li key={index}>{lang}</li>
            ))}
          </ul>
          <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="250" />
        </div>
        <div>
          <h2>Weather in {country.capital[0]}</h2>
          {countryInfo.main ? (
            <>
              <p>Temperature: {(countryInfo.main.temp - 273.15).toFixed(2)} °C</p>
              <p>Wind: {countryInfo.wind.speed} m/s</p>
              {countryInfo.weather && countryInfo.weather[0] && (
                  <img
                    src={`https://openweathermap.org/img/wn/${countryInfo.weather[0].icon}@2x.png`}
                    alt="Weather icon"
                  />
                )}
            </>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      </>
    )
  }

  return <p>Nothing found</p>

}


export default FilterAnswers