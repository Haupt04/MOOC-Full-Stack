import { Part } from "./Part";


export const Content = ({ course }) => {
  const total = course.reduce((sum, amount) => sum + amount.exercises, 0)
 
  return (
  <div>
    {course.map((c) => {
      return <Part key={c.id} c={c} />;
    })}
    <div>
      <p><b>Total Amount of Exercises: {total.toString()}</b></p>
    </div>
  </div>
)}
