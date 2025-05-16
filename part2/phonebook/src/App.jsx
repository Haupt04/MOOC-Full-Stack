import { useState } from 'react'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [show,_] = useState(true)
  const [newNum, setNum] = useState('')
  const [search, setSearch] = useState('')

  const handleNewName = (event) => {
      console.log(event.target.value)
      setNewName(event.target.value)
  }
  
    const handlePhoneNum = (event) => {
      console.log(event.target.value)
      setNum(event.target.value)
  }
  

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNum,
    }

    const check = persons.find((person) => person.name == newName)
    
    if (check == undefined){
      setPersons(persons.concat(personObject))
      setNewName("")
      setNum("")
    } else {
      window.alert(`${newName} is already in the phonebook`)
    }
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)    
  }

  const results = persons.filter(person => Object.values(person).some( value => String(value).toLowerCase().includes(search.toLowerCase())))
  const listPeople = show ? persons : "No person add yet";
  return (
    <div>
      <h2>Phonebook</h2>
      <div> 
          <input value={search} onChange={handleSearch} placeholder='Start Typing'/>
      </div>

      <h2>Add new user</h2>
      <form onSubmit={addPerson}>
        <div>
          Name: <input value={newName} onChange={handleNewName} required/>
        </div>
        <div>
          Phone Number: <input value={newNum} onChange={handlePhoneNum} required />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {search ? results.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      ) :listPeople.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App