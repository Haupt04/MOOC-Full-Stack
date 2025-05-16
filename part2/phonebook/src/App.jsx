import { useState } from 'react'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "076 756 3673"
     }
  ]) 
  const [newName, setNewName] = useState('')
  const [show,setShow] = useState(true)
  const [newNum, setNum] = useState('')

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

  const listPeople = show ? persons : "No person add yet";
  return (
    <div>
      <h2>Phonebook</h2>
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
      {listPeople.map(person => 
        <p key={person.name}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App