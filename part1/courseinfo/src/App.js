const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return(
    <div>
      <h1> Web development curriculum</h1>
    <div>
      {courses.map(course => <Course course = {course} key={course.id}/>)}
    </div>
    </div>
  ) 
}

const Course = (props) => {
  return(
    <div>
      <div>
        <h2>{props.course.name}</h2>
      {props.course.parts.map(part => <div key={part.id}>{part.name} {part.exercises}</div>)}
      <Total course = {props.course}/>
      </div>
      <div>--------------------------</div>
    </div>
  )
}

const Total = (props) => {

  const total = props.course.parts.reduce(
    function (acc, obj) { return acc + obj.exercises}, 0
  )

  return(
    <div>Total of {total} exercises</div>
  )
  // let total = 0;
  // for(let i = 0; i < props.course.parts.length; i++){
  //   total += props.course.parts[i].exercises
  // }
  // return(
  //   <div>
  //     total of {total} exercises         
  //   </div>
  // )
}

export default App