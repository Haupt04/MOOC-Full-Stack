import './App.css'

export const Button = ({handle, text}) => {
  return (
    <div className="space">
        <button className="space" onClick={handle}>{text}</button>
    </div>
 
  )
}
