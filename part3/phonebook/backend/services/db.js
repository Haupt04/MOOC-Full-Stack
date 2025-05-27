import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

const connectDatabase = async () => {
  try {
    await mongoose.connect(url)
    console.log('Connected to database')
  } catch (error) {
    console.log('Error occurred: ', error.message)
  }
}

export default connectDatabase