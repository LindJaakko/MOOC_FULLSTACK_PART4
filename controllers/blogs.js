const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.title === undefined && body.url === undefined) {
    response.status(400).end()
  }

  if (body.likes === undefined) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: 0,
    })
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } else {
    const blog = new Blog(request.body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
