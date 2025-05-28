import express from 'express'
import connectDatabase from './services/db.js'
import dbFunction from './middleware/dbFunctions.js'
import config from './utils/config.js'
const { PORT } = config


const app = express()

app.use(express.json())

// Completed 4.2
app.use('/api/blogs', dbFunction)


connectDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error)
    process.exit(1) 
  })


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

export default app