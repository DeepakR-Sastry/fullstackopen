import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number: "123456789"}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([...persons])



  const addName = (event) =>{
    event.preventDefault()
    if(persons.some(e => e.name === newName)){
      alert(`${newName} is already added to phonebook`)
    }
    else{
      const personObject = {
        name: newName,
        number: newNum
      }
      setPersons(persons.concat(personObject))
      setFilteredPersons(persons.concat(personObject))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }

  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
    if(event.target.value != ''){
      let copy = persons.filter(person => person.name === event.target.value)
      setFilteredPersons(copy)
    }
    else{
      setFilteredPersons([...persons])
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with a <input onChange = {handleFilterChange} value = {filter}/></div>
      </form>
      <form onSubmit={addName}>
          <div>Name: <input onChange = {handleNameChange} value = {newName}/></div>
          <div>Number: <input onChange = {handleNumChange} value = {newNum}/></div>
          <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {filteredPersons.map(person => <Person key={person.name} name = {person.name} number={person.number}/>)}
      </div>
    </div>
  )
}

const Person = (props) =>{
  return(
    <div>{props.name} : {props.number}</div>
  )
}

export default App
