<<<<<<< HEAD
// src/validations/orders.ts
import { body } from 'express-validator';

export const createOrderValidation = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('productId').isInt().withMessage('Product ID must be an integer'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
  body('totalPrice').isFloat({ gt: 0 }).withMessage('Total price must be greater than 0'),
];
=======
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
>>>>>>> ae61c98b84bbb5d60d8c73d10e8a42282244eefb
