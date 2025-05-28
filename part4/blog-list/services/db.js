import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI


mongoose.set('strictQuery', false)

const connectDatabase = async () => {
  try {
    await mongoose.connect(url)
    console.log('Connected to database')
  } catch (error) {
    console.log('Error occurred: ', error.message)
    throw error
  }
}

export default connectDatabase