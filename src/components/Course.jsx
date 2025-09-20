
const Course = ({course}) => {
  return(
  <div>
    {course.map(c => {
      return(
        <div key={c.id}>
        <Header  name = {c.name}/>
        <Content  parts = {c.parts}/> 
        </div>
      )
    })}
  </div>
  )
}
const Header = ({name}) => {
  return(
    <h2>{name}</h2>
  )
}
const Sum = ({parts}) => {
  const total = () => 
  parts.reduce((sum,part) => sum + part.exercises, 0)

  return(
    <h4>total of {total()} exercises</h4>
  )
}
const Content = ({parts}) =>{
  return(
   <div>
     {parts.map(p => {
      return(
      <Part key={p.id} name={p.name} exercises={p.exercises} />
      )
     })}
     <Sum parts = {parts}/>
   </div>
  )
}
const Part = ({name, exercises}) =>{
  return(
    <p>
      {name} {exercises}
    </p>
  )
}

export default Course