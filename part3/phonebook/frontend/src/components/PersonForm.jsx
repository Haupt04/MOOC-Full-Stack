const PersonForm = ({ addPerson, newName, handleNewName, newNum, handlePhoneNum }) => (
  <form onSubmit={addPerson}>
    <div>
      Name: <input value={newName} onChange={handleNewName} required />
    </div>
    <div>
      Phone Number: <input value={newNum} onChange={handlePhoneNum} required />
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

export default PersonForm
