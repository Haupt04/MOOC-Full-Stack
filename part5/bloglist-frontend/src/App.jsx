import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogService from './services/blogs'
import { Login } from './components/Login'
import CreateBlogPost from './components/CreateBlogPost'
import Togglable from './components/Togglable'

// Completed 5.1-5.4

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user,setUser] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
   const fetchBlogs = async () => {
    const blogs = await BlogService.getAll();
    setBlogs(blogs);
    };
    fetchBlogs();
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser){
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])


  const logoutBtn = async () => {
    window.localStorage.removeItem('loggedInUser')
    window.location.href= '/login'  
  }

  const handleAddBlog = async(newBlogData) => {
    const newBlog = await BlogService.create(newBlogData);
    setBlogs(prev => [...prev, newBlog])
  }

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
      return () => clearTimeout(timer)
    }
    }, [errorMessage]);

  useEffect(() => {
    if (successfulMessage) {
      const timer = setTimeout(() => {
        setSuccessfulMessage(null)
      }, 5000);
      return () => clearTimeout(timer)
    }
    }, [successfulMessage]);

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successfulMessage && <div style={{ color: 'green' }}>{successfulMessage}</div>}
      {user === null ? <>
      <Login user={user} setUser={setUser} setErrorMessage={setErrorMessage}/>
      </> :
      <div>
        <p>{user.name} has logged in</p>
        <button onClick={logoutBtn}>Log Out</button>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      {/* Exercise 5.5 */}
        <Togglable buttonLabel="Create Blog">
          <CreateBlogPost handleAddBlog={handleAddBlog} setSuccessfulMessage={setSuccessfulMessage} />
        </Togglable>
      </div> }
    </div>
  )
}

export default App