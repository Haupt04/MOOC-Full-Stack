import mongoose from "mongoose";


if (process.argv.length < 3){
    console.log("Give password to access the database");
    process.exit(1)
}


const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


const url = `mongodb+srv://fullstackbrittany:${password}@cluster0.mea7jfy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery', false)

mongoose.connect(url)

const entrySchema = new mongoose.Schema({
    name: String,
    number: String
})

const Entry = mongoose.model('People', entrySchema)


if (process.argv.length == 3){
    Entry.find({}).then(result => {
        console.log("Phonebook")
        result.forEach(r => {
            console.log(`${r.name} ${r.number}`)
        })
        mongoose.connection.close()
    })
    
} else {
    const newEntry = new Entry({
    name: name,
    number: number,
    })


    newEntry.save().then(() => {
        console.log(`added ${name} and number: ${number} to database`)
        mongoose.connection.close()
    })
}
