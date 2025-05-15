import Part from "./Part"


function Content({parts}) {

  return (
    <div>
        <Part parts={parts[0]} />
        <Part parts={parts[1]} />
        <Part parts={parts[2]} />
    </div>
  )
}

export default Content