
const ButtonHandle = ({country, weather={}}) => {
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
        {weather.main ? (
          <>
            <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            {weather.weather && weather.weather[0] && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
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





export default ButtonHandle