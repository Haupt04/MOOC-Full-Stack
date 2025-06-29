import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'
import Blog from '../models/entry.model.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { test, beforeEach, after, describe } from 'node:test'
import assert from 'assert'
import bcrypt from 'bcryptjs'

const api = supertest(app)

const initialBlogs = [
  { title: 'First blog', author: 'Author One', url: 'http://first.com', likes: 5 },
  { title: 'Second blog', author: 'Author Two', url: 'http://second.com', likes: 10 }
]


beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('testpass', 10)
  const testUser = new User({ username: `testuser${Date.now()}`, passwordHash })
  const savedUser = await testUser.save()

  const userForToken = { username: savedUser.username, id: savedUser._id }
  const token = jwt.sign(userForToken, process.env.SECRET)

  global.testToken = token

  const blogObjects = initialBlogs.map(b => new Blog({ ...b, user: savedUser._id }))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('Gets Blog Posts via GET request', async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, initialBlogs.length)
})


test('ID is correctly named by default', async () => {
  const response = await api.get("/api/blogs")
  
  response.body.forEach(blog => {
    assert.ok(blog.id, 'Should have a id property')
    assert.strictEqual(blog._id, undefined, "doesn't have _id")
  })

})

test('Checking POST request made a new post', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Author Test',
    url: 'http://example.com/new',
    likes: 5,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${global.testToken}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})

test('Blog creation fails with 401 if token not provided', async () => {
  const newBlog = {
    title: 'Unauthorized Blog',
    author: 'NoToken',
    url: 'http://example.com/fail',
    likes: 2,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})


test('Checking the like property', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Author Test',
    url: 'http://example.com/new',
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${global.testToken}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  assert.strictEqual(response.body.likes, 0)

})


test('Checking we get 400 Bad Request when POST without url/title', async () => {
  const newBlog = {
    author: 'Author Test',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${global.testToken}`)
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})

test('Deleting a blog post', async () => {
  const response = await api.get("/api/blogs")
  const blogToDelete = response.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${global.testToken}`)
    .expect(204)

  const responseAfter = await api.get('/api/blogs')
  assert.strictEqual(responseAfter.body.length, initialBlogs.length - 1)
})


test('Updating first blog post', async () => {
  const updatedBlog = {
    title: 'Updated Title',
    author: 'Updated Author',
    url: 'http://example.com/updated',
    likes: 2,
  }

  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const oldBlog = response.body[0]


  const updateRequest = await api
    .put(`/api/blogs/${oldBlog.id}`)
    .set('Authorization', `Bearer ${global.testToken}`)
    .send(updatedBlog)
    .expect(200)  

  const responseAfter = await api.get(`/api/blogs/${oldBlog.id}`).expect(200)

  assert.deepStrictEqual(responseAfter.body, updateRequest.body)
})


after(async () => {
  await mongoose.connection.close()
})
