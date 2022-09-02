const express = require("express")
const app = express()
var morgan = require('morgan')

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(morgan())
app.use(express.static('build'))



let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Fam Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request, response)  => {
    response.json(persons)
})

app.get("/api/persons/:id", (request, response)=>{
    const id = Number(request.params.id)
    console.log(id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }
    else{
        return response.status(400).json({
            error: "content missing"
        })
    }
    
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.get("/info", (request, response) => {
    const phonebookLength = persons.length
    const newDate = new Date()
    response.send(`<h1>Number of people in the phonebook: ${phonebookLength}</h1>
    <div>${newDate}</div>`)
})

app.post("/api/persons", (request, response) =>{
    const id = persons.length+1
    const body = request.body


    let exists = persons.find(person => person.name === body.name)

    if(exists){
        return response.status(409).json({
            error: "name already exists"
        })
    }

    if(body.name && body.number){

        const person = {
            id: id,
            name: body.name,
            number: body.number,
        }
    
        persons = persons.concat(person)
        response.json(persons)
    
        
    }
    else{
        return response.status(400).json({
            error: "content missing"
        })
    }


})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})