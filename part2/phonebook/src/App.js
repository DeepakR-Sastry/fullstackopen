import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')



  const addName = (event) =>{
    event.preventDefault()
    if(persons.some(e => e.name === newName)){
      alert(newName + 'is already added to phonebook')
    }
    else{
      const personObject = {
        name: newName
      }
      setPersons(persons.concat(personObject))  
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
          <input onChange = {handleNameChange} value = {newName}/>
          <button type="submit">add</button>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(name => <Name key={name.name} name = {name.name}/>)}
      </div>
    </div>
  )
}

const Name = (props) =>{
  return(
    <div>{props.name}</div>
  )
}

export default App
