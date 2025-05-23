import Joi from 'joi'

const getAllOrders = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({})
})

const createOrder = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    productId: Joi.number().required(),
    quantity: Joi.number().min(1).required()
  })
})

export default {
  getAllOrders,
  createOrder
}
