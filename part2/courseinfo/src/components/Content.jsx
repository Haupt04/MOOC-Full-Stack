import { Part } from "./Part";


export const Content = ({ course }) => {
  // Step 2.3 Done in 2.2 as I already used the reduce method
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
