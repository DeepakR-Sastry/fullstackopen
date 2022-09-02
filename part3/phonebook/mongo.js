const mongoose = require('mongoose')

if(process.argv.length == 5){
    console.log("this")
    const password = process.argv[2]

    const personSchema = new mongoose.Schema({
        name: String,
        number: Number,
    })

    const url = `mongodb+srv://deepak:${password}@cluster0.aemdbqs.mongodb.net/phonebookApp?retryWrites=true&w=majority`

    const inputName = process.argv[3]
    const inputNumber = process.argv[4]

    const Person = mongoose.model("Person", personSchema)

    mongoose
        .connect(url)
        .then((result) => {
            console.log("connected")

            const person = new Person({
                name: inputName,
                number: inputNumber,
            })

            return person.save()
        })
        .then(() => {
            console.log("person saved!")
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))



}
else if(process.argv.length == 3){
    const password = process.argv[2]
    const url = `mongodb+srv://deepak:${password}@cluster0.aemdbqs.mongodb.net/phonebookApp?retryWrites=true&w=majority`


    const personSchema = new mongoose.Schema({
        name: String,
        number: Number,
    })

    const Person = mongoose.model("Person", personSchema)
    console.log(1)
    mongoose
        .connect(url)
        .then((result) => {
            console.log("connected")
            Person.find({}).then(result => {
                result.forEach(person => {
                    console.log(person)
                })
            })
        })
        .then(() => {
            console.log("Done")
            return mongoose.connection.close()
        })
        .catch((err) => console.log(err))


}
else{
    console.log("Incorrect arguments")
    process.exit(1)
}

