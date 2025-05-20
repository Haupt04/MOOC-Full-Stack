import { useState } from "react"
import ButtonHandle from "./ButtonHandle"

const FilterAnswers = ({countries, searchTerm}) => {
  const [selectedCountry, setSelectedCountry] = useState(null)
    
  const filterCountries = countries.filter(country => (
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ))

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
      <ButtonHandle country={selectedCountry} />
      <button onClick={() => setSelectedCountry(null)}>Back</button>
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

  return <p>Nothing found</p>

}


export default FilterAnswers