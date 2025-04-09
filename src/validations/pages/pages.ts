import Joi from 'joi'

const getPage = Joi.object({
  query: Joi.object({
    name: Joi.string().required()
  }),
  params: Joi.object({}),
  body: Joi.object({})
})

const updatePage = Joi.object({
  query: Joi.object({
    name: Joi.string().required()
  }),
  params: Joi.object({}),
  body: Joi.object({
    content: Joi.object({}).unknown()
  })
})

export default {
  getPage,
  updatePage
}
