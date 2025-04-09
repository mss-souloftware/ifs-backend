import Joi from 'joi'

const getAllBlogs = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({})
})

const createBlog = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    title: Joi.string().required(),
    thumbnail: Joi.string().required(),
    content: Joi.string().required(),
    categoryId: Joi.number().required()
  })
})

const updateBlog = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    blogId: Joi.number().required()
  }),
  body: Joi.object({
    title: Joi.string().optional(),
    thumbnail: Joi.string().optional(),
    content: Joi.string().optional(),
    categoryId: Joi.number().optional()
  })
})

const deleteBlog = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    blogId: Joi.number().required()
  }),
  body: Joi.object({})
})

export default {
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
}
