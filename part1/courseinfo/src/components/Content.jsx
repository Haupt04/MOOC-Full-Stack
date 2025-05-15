import Part from "./Part"


function Content({data}) {
  return (
    <div>
        <Part part={data.part1} exercise={data.exercises1} />
        <Part part={data.part2} exercise={data.exercises2} />
        <Part part={data.part3} exercise={data.exercises3} />
    </div>
  )
}

export default Content