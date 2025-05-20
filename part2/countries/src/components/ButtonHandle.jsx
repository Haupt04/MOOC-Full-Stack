
const ButtonHandle = ({country}) => {
    const listLanguages = Object.values(country.languages)
    return (
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
    )
  }  





export default ButtonHandle