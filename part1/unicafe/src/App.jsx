import { useState } from 'react'
import './App.css'
import { Button } from './components/Button'


const Statistics = ({props}) => {
  const {Good,Bad,Neutral} = props
  
  let all = Good + Neutral + Bad
  let average = (Good - Bad) / all
  let percentage = Good / all * 100


  return (
    <div>
        <h1>Statistics</h1>
        <p>Good: {Good}</p>
        <p>Neutral: {Neutral}</p>
        <p>Bad: {Bad}</p>
        <br/>
        <p>Total Votes: {all}</p>

        <p>Average: { average > 0 ? average.toString() : "0"} </p>

        <p>Positive Percentage: { percentage > 0 ? percentage.toString() + "%": "0%"}</p>
    </div>
  )
}




function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodButton = () => {
    setGood(prev => prev + 1)
  }

  const handleNeutralButton = () => {
    setNeutral(prev => prev + 1)
  }

  const handleBadButton = () => {
    setBad(prev => prev + 1)
  }
  return (
    <div>
      <h1>Giving Feedback</h1>
      <Button handle={handleGoodButton} text="Good" />
      <Button handle={handleNeutralButton} text="Neutral" />
      <Button handle={handleBadButton} text="Bad" />
      <Statistics props={{Good: good,Neutral: neutral,Bad: bad}} />
    </div>
  )
   
}

export default App
