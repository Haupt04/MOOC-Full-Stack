import { useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import Server from './server.js'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNum] = useState('')
  const [search, setSearch] = useState('')


  useEffect(() => {
    Server.getAllPerson()
    .then(response => {
      console.log("axios", response)
      setPersons(response)
    })
  },[])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneNum = (event) => {
    setNum(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum,
    }

    const check = persons.find((person) => person.name === newName)
    
    if (!check) {
      Server.createEntry(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNum('')
      })
      
    } else {
      window.alert(`${newName} is already in the phonebook`)
    }
  }

  const filteredPersons = search
    ? persons.filter(person => Object.values(person).some(value =>
        String(value).toLowerCase().includes(search.toLowerCase())
      ))
    : persons

console.log("Rendering Persons with:", filteredPersons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      
      <h2>Add new user</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNum={newNum}
        handlePhoneNum={handlePhoneNum}
      />
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons || []} />
    </div>
  )
}

export default App
