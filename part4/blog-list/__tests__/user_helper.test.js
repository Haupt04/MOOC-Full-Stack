import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'
import { test, beforeEach, after, describe } from 'node:test'
import assert from 'assert'
import User from '../models/user.model.js'

const api = supertest(app)

test('Creating a new User Successfully', async (t) => {
    await User.deleteMany({})

    const newUser = {
        username: 'testuser',
        name:'Test',
        password:'testpassword'
    }


  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.equal(response.body.username, newUser.username)

  const checkUserCreated = await User.find({})
  assert.equal(checkUserCreated.length, 1)
  assert.ok(checkUserCreated.some(user => user.username === 'testuser'))
})

test('Error for User with no username', async () => {

    const newUser = {
        name:'TestTwo',
        password:'testpassword'
    }


  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.ok(response.body.error.includes('Must enter name/username/password'))

  const checkUserCreated = await User.find({})
  assert.ok(!checkUserCreated.some(user => user.username === 'TestTwo'))
})


test('Error for User with password to short', async () => {

    const newUser = {
    username: 'shortpassuser',
    name: 'Short Pass',
    password: 'ab'
    }


  const response = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  assert.ok(response.body.error.includes('Password must be longer then 3 letters'))

  const checkUserCreated = await User.find({})
  assert.ok(!checkUserCreated.some(user => user.username === 'TestThree'))
})



test.after(async () => {
    await mongoose.connection.close()
})