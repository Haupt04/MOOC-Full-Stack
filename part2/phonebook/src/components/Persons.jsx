const Persons = ({ persons, deletePerson }) => (
  <>
    {persons.map(person => (
      <div key={person.name}>
        <p> {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>Delete User</button></p>
      </div>
      
    ))}
  </>
)

export default Persons
