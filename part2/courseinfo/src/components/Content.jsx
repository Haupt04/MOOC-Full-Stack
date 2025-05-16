import { Part } from "./Part";


export const Content = ({ course }) => (
  <div>
    {course.map((c) => {
      return <Part key={c.id} c={c} />;
    })}
  </div>
);
