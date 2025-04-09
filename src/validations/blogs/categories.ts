import Joi from 'joi'

const getAllCategories = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({})
})

const createCategory = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().required()
  })
})

const updateCategory = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.number().required()
  }),
  body: Joi.object({
    name: Joi.string().optional()
  })
})

const deleteCategory = Joi.object({
  query: Joi.object({}),
  params: Joi.object({
    categoryId: Joi.number().required()
  }),
  body: Joi.object({})
})

export default {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
}
