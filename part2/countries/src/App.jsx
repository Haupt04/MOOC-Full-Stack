import Server from './server.js'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'


const FilterAnswers = ({countries, searchTerm}) => {
    
  const filterCountries = countries.filter(country => (
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  ))

  if (searchTerm == "") {
    return null
  }
  else if (filterCountries.length > 10){
    return (
      <div>
        <p>Too many matches,specify another filter</p>
      </div>
    )
  } else if (filterCountries.length <= 10 && filterCountries.length > 1 ){
    return (
      <ul>
      {filterCountries.map((country,index) => (
        <li key={index}>{country.name.common}</li>
      ))}
      </ul>
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

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  // const [error,setError] = useState(null)

  useEffect(() => {
    Server.getAllCountries().then( response => setCountries(response))
  },[])

  const handleSearch = (event) => {
    setSearchTerm(event.target.value)
    console.log(searchTerm)
  }

  return (
    <div>
      <label htmlFor='search'>Find Countries: <input id='search' name='searchTerm'type='text' onChange={handleSearch} value={searchTerm}/></label>
      <FilterAnswers countries={countries} searchTerm={searchTerm} />
    </div>
  )
}

export default App
