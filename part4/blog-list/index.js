import express from 'express'
import connectDatabase from './services/db.js'
import dbFunction from './middleware/dbFunctions.js'


const app = express()

app.use(express.json())

// Completed 4.2
app.use('/api/blogs', dbFunction)


connectDatabase()

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})