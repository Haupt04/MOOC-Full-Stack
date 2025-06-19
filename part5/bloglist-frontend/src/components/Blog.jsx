import { useEffect, useState } from "react"
import BlogService from '../services/blogs.js'


const Blog = ({ blog, user, handleDelete }) => {
  const [displayVisible, setDisplayVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const handleLikeButton = async (blog) => {
    try {
      console.log('Blog', blog)
      const updatedBlog = await BlogService.update(blog._id || blog.id, {
        user: blog.user?.id || blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url:blog.url
      })
      setLikes(updatedBlog.likes)
    } catch (error) {
      console.log("Error", error)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    paddingBottom: 10
  }

  const hideWhenVisible = { display: displayVisible? 'none' : '' }
  const showWhenVisible = { display: displayVisible ? '' : 'none' }

  return (
  <div style={blogStyle}>
    <p>{blog.title} by {blog.author}</p>
    <div style={hideWhenVisible}>
      <button onClick={() => setDisplayVisible(true)}>View</button>
    </div>

    <div style={showWhenVisible}>
      <p>Url: {blog.url}</p>
      <div>
        <p>Likes: {likes.toString()}</p>
        <button onClick={() => handleLikeButton(blog)}>Like</button>
      </div>
      <p>Author: {blog.author}</p>
      <button onClick={() => setDisplayVisible(false)}>Hide</button>
      {(blog.user?.id || blog.user) === user.id && (
      <button onClick={() => handleDelete(blog)}>Delete</button>
      )}

    </div>
  </div>  
)
}
export default Blog