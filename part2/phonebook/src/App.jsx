import { useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect } from 'react'
import Server from './server.js'

const Notification = ({ message }) => {
    if (message == null) {
      return null
    }

    return (
      <div className='success'>
        {message}
      </div>
    )
  }

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNum] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState(null)



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
      name: newName.trim(),
      number: newNum.trim(),
    }

    const normalizedNewName = newName.trim().toLowerCase()
    const check = persons.find((person) =>
      person.name.trim().toLowerCase() === normalizedNewName
    )

    if (!check) {
      Server.createEntry(personObject)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNum('')
        setMessage(`${personObject.name} has been added`)
        setTimeout(() => {
        setMessage(null)
      }, 5000)
      })
    } else {
      const confirm = window.confirm(`${check.name} is already added to the phonebook, replace the old number with a new number? `)
      if (confirm){
        Server.updatePerson(check.id, personObject)
      .then(response => {
        setPersons(persons.map(person => person.id !== check.id ? person: response))
        setNewName('')
        setNum('')
        setMessage(`${check.name} has been updated`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
      }
      
    }
  }

  const deletePerson = (id, name) => {
   const confirm = window.confirm(`Delete ${name}`)
   if (confirm) {
    Server.deletePerson(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
        console.log("Deleted Successfully")
    })
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
      <Notification message={message}/>
      <h2>Add new user</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNewName={handleNewName}
        newNum={newNum}
        handlePhoneNum={handlePhoneNum}
      />
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons || []} deletePerson={deletePerson} />
    </div>
  )
}

export default App
