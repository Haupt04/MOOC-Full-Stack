const Filter = ({ search, handleSearch }) => (
  <div>
    <input value={search} onChange={handleSearch} placeholder='Start Typing' />
  </div>
)

export default Filter
