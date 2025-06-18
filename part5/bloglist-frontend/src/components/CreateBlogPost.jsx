import React, { useState } from 'react'
import BlogService from '../services/blogs'

const CreateBlogPost = ({handleAddBlog,setSuccessfulMessage}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setURL] = useState('')
    const [likes, setLikes] = useState(0)

    const handleNewBlogPost = async (event) => {
        event.preventDefault()

        try {
            await handleAddBlog({
              title: title,
              author: author,
              url: url,
              likes: likes
            })
            setSuccessfulMessage(`A New Blog Post: ${title} by ${author}`)
            setTitle('');
            setAuthor('');
            setURL('');
            setLikes(0);
        } catch (error) {
            console.error(error)
        }
    }

  return (
    <div>
        <h1>Create New Blog Post</h1>
        <form onSubmit={handleNewBlogPost} >
        <div>
            Title: 
            <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author: 
            <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url: 
            <input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <div>
          Likes: 
            <input
            type="number"
            value={likes}
            name="Likes"
            onChange={({ target }) => setLikes(target.value)}
          />
        </div>
        <button type="submit">Create Blog Post</button>
      </form>
    </div>
  )
}

export default CreateBlogPost