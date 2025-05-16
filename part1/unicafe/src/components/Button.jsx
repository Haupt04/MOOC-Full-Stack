import '../App.css'

export const Button = ({handle, text}) => {
  return (
    <div>
      <button className="space" onClick={handle}>{text}</button>
    </div>
 
  )
}
