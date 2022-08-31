import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [filter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([...persons])
  const [count, setCount] = useState(0)


  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
      setFilteredPersons(response.data)
    })
  }, [count])

  const addName = (event) =>{
    event.preventDefault()
    if(persons.some(e => e.name === newName)){
      const found = persons.find(e => e.name ===newName)
      if(window.confirm(`${newName} is already added to the phonebook. Do you want to replace the old number with a new one?`)){
        const edited = {...found}
        edited.number = newNum
        axios
          .put("http://localhost:3001/persons/" + found.id, edited)
          .then(response => {
            setCount(count+1)
          })
      }
    }
    else{
      const personObject = {
        name: newName,
        number: newNum
      }
      setPersons(persons.concat(personObject))
      setFilteredPersons(persons.concat(personObject))
      axios
        .post("http://localhost:3001/persons", personObject)
        .then(response => {
          setCount(count+1)
        })
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

  const deletePerson = (props) =>{
    if (window.confirm("Do you really want to delete this person?")){
      axios
      .delete("http://localhost:3001/persons/" + props.person.id)
      .then(response => {
        setCount(count+1)
      })
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
        {filteredPersons.map(person => <div key={person.name}><Person key={person.name} name = {person.name} number={person.number}/>
        <button onClick={() => deletePerson({person})}>Delete</button></div>)}
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
