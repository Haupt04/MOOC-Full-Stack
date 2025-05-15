import Content from "./components/Content"
import Header from "./components/Header"
import Total from "./components/Total"


const App = () => {
  const course = 'Half Stack application development'

  const data = {
    part1 : 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }

  return (
    <div>
      <Header course={course} />
      <Content data={data} />
      <Total data={data} />
    </div>
  )
}

export default App