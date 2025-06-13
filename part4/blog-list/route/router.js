import express from 'express'
import Blog from '../models/entry.model.js'
import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import getTokenFrom from '../middleware/getToken.js'
import userExtractor from '../middleware/userExtractor.js'


const router = express.Router()
router.use(getTokenFrom)

router.get('/', async (request, response) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }) 
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

    const { title, author, url, likes} = request.body

    if (!title || !url) {
      return response.status(400).json({ error: 'title and url are required' })
    }
    
    let decodedToken;
    try {
      if (!request.token) {
        return response.status(401).json({ error: 'token missing' })
      }
      
      decodedToken = jwt.verify(request.token, process.env.SECRET)

      if (!decodedToken.id || !request.token ){
        return response.status(401).json({error: 'token invalid'})
      }
    } catch (error) {
      return response.status(401).json({ error: 'token invalid' })
    }

    try {
      const user = await User.findById(decodedToken.id)

      if (!user) {
        return response.status(400).json({ error: 'User not found' })
      }

      const blog = new Blog({
        title,
        author,
        url,
        likes,
        user: user._id
      })

      const savedBlog = await blog.save()

      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()

      response.status(201).json(savedBlog)

    } catch (error) {
      console.error('POST /api/blogs error:', error.name, error.message)
      response.status(400).json({ error: 'Failed to save blog' }) 
    }
})

router.delete('/:id', userExtractor, async (request, response) => {
  try {
    const { id } = request.params

    const user = request.user

    if (!user){
      return response.status(401).json({error: 'token invalid'})
    }

    const blogPost = await Blog.findById(id)
    if (!blogPost){
      return response.status(404).json({ error: 'Blog not found' });
    }

    if (blogPost.user.toString() !== user._id.toString()){
      return response.status(403).json({ error: 'Unauthorized: not the blog owner' });
    }

    await User.findByIdAndUpdate(user._id, {
      $pull: {blogs: blogPost._id}
    })

    await blogPost.deleteOne()
    response.status(204).end()

  } catch (error) {
    console.error('Delete error:', error)
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
