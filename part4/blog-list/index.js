import express from 'express'
import connectDatabase from './services/db.js'
import dbFunction from './route/router.js'
import config from './utils/config.js'
import userRoute from './route/userRoute.js'
import getTokenFrom from './middleware/getToken.js'
const { PORT } = config



const app = express()

app.use(express.json())
app.use(getTokenFrom)

// Completed 4.2
app.use('/api/blogs', dbFunction)
app.use('/api/users', userRoute)




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

export default app