import Server from './server.js'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import FilterAnswers from './components/FilterAnswers.jsx'



function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState("")


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
