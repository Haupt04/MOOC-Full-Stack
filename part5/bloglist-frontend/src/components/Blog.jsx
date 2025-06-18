const Blog = ({ blog }) => (
  <div>
    <p>{blog.title} by {blog.author}</p>
     {/* {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )} */}
      
  </div>  
)

export default Blog