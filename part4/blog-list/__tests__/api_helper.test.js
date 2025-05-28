import mongoose from 'mongoose'
import supertest from 'supertest'
import app from '../index.js'
import Blog from '../models/entry.model.js'
import { test, beforeEach, after } from 'node:test'
import assert from 'assert'

const api = supertest(app)

const initialBlogs = [
  { title: 'First blog', author: 'Author One', url: 'http://first.com', likes: 5 },
  { title: 'Second blog', author: 'Author Two', url: 'http://second.com', likes: 10 }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
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
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
})


test('Checking the like property', async () => {
  const newBlog = {
    title: 'New Blog',
    author: 'Author Test',
    url: 'http://example.com/new',
  }

  const response = await api
    .post('/api/blogs')
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
    .send(newBlog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

})


after(async () => {
  await mongoose.connection.close()
})
