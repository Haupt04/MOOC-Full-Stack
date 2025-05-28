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

router.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json({ error: 'Failed to save blog' })
  }
})


export default router
