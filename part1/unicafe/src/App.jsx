import { useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import StatisticsLine from './components/StatisticsLine'


const Statistics = ({props}) => {
  const {Good,Bad,Neutral} = props
  
  let all = Good + Neutral + Bad
  let average = (Good - Bad) / all
  let percentage = Good / all * 100

  if (all> 0) {
    average = average.toString()
  } else {
    average = "0"
  }

  if (all > 0){
    percentage = percentage.toString() + "%"
  } else {
    percentage = "No Feedback Given"
  }

  return (
    <div>
      <StatisticsLine text="Good: " value={Good} />
      <StatisticsLine text="Neutral:" value={Neutral} />
      <StatisticsLine text="Bad: " value={Bad} />
      <StatisticsLine text="Total Votes: " value={all} />
      <StatisticsLine text="Average: " value={average} />
      <StatisticsLine text="Positive Percentage: " value={percentage} />
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
