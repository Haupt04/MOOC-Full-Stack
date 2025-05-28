
const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}


const favoriteBlog = (blogs) => {

  let highest = blogs[0]

  blogs.forEach(blog => {
    highest = blog.likes > highest.likes ? blog : highest
  })
  
  return highest
}



const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCount = {}

  blogs.forEach(blog => {
    authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
  })

  const maxBlogs = Math.max(...Object.values(authorCount))

  const author = Object.keys(authorCount).find(author => authorCount[author] === maxBlogs)

  return { author, blogs: maxBlogs }
}


const mostLikes = (blogs) => {

  const mostLikedAuthor = {}

  blogs.forEach(blog => {
    mostLikedAuthor[blog.author] = (mostLikedAuthor[blog.author] || 0) + blog.likes
  })

  const mostLikes = Math.max(...Object.values(mostLikedAuthor))

  const author = Object.keys(mostLikedAuthor).find(author => mostLikedAuthor[author] === mostLikes)

  return {author, likes: mostLikes}
}




module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes};