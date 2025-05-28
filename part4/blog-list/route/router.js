import express from 'express'
import Blog from '../models/entry.model.js'

const router = express.Router()


router.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({})
        response.status(200).json(blogs)
    } catch (error) {
        response.status(500).json({ error: 'Failed to fetch blogs' })
    }
})

router.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(400).json({ error: 'Malformed id' })
  }
})


router.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json({ error: 'Failed to save blog' })
  }
})

router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params

    await Blog.findByIdAndDelete(id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: 'Failed to delete blog' })
  }
})


router.put('/:id', async (request, response) => {
  try {
    const { id } = request.params
    const { _id, ...updatedInfo } = request.body 

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedInfo, {
      new: true,
      runValidators: true,
      context: 'query'
    })

    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog not found' })
    }

    response.status(200).json(updatedBlog)
  } catch (error) {
    console.error('PUT error:', error)
    response.status(400).json({ error: 'Failed to update blog' })
  }
})




export default router
