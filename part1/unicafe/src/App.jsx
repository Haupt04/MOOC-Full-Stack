import { useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import Statistics from './components/Statistics'

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
   
}

export default App
