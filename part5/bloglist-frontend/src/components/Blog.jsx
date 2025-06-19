import { useState } from "react"
import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  const [displayVisible, setDisplayVisible] = useState(false)

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
        <p>Likes: {blog.likes.toString()}</p>
        <button>Likes</button>
      </div>
      <p>Author: {blog.author}</p>
      <button onClick={() => setDisplayVisible(false)}>Hide</button>
    </div>
  </div>  
)
}
export default Blog