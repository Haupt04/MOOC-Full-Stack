
const Statistics = ({good, neutral, bad}) => {
  
  let all = good + neutral + bad
  let average = (good - bad) / all
  let percentage = good / all * 100


  return (
    <div>
        <h1>Statistics</h1>
        <p>Good: {good}</p>
        <p>Neutral: {neutral}</p>
        <p>Bad: {bad}</p>
        <br/>
        <p>Total Votes: {all}</p>

        <p>Average: { average > 0 ? average.toString() : "0"} </p>

        <p>Positive Percentage: { percentage > 0 ? percentage.toString() + "%": "0%"}</p>
    </div>
  )
}

export default Statistics