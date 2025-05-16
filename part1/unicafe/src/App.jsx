import { useState } from 'react'
import './App.css'
import { Button } from './components/Button'
import StatisticsLine from './components/StatisticsLine'


const Statistics = ({props}) => {
  const {Good,Bad,Neutral} = props
  
  let all = Good + Neutral + Bad
  let average = (Good - Bad) / all
  let percentage = Good / all * 100

  if (all > 0) {
    average = average.toString()
  } else {
    return (
      <tbody>
        <tr>
          <td>No feedback given</td>
        </tr>
      </tbody>
    )
  }

  if (all > 0){
    percentage = percentage.toString() + "%"
  } else {
    percentage = "No Feedback Given"
  }

  return (
     <tbody>
      <StatisticsLine text="Good" value={Good} />
      <StatisticsLine text="Neutral" value={Neutral} />
      <StatisticsLine text="Bad" value={Bad} />
      <StatisticsLine text="Total Votes" value={all} />
      <StatisticsLine text="Average" value={average} />
      <StatisticsLine text="Positive Percentage" value={percentage} />
    </tbody>
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
    <>
    <h2>Giving Feedback</h2>
      <Button handle={handleGoodButton} text="Good" />
      <Button handle={handleNeutralButton} text="Neutral" />
      <Button handle={handleBadButton} text="Bad" />
      
      <h2>Statistics</h2>
      <table className="statistics-table">
      <Statistics props={{Good: good,Neutral: neutral,Bad: bad}} />
      </table>
    </>
  )
   
}

export default App
