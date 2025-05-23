import express from 'express'
import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'
import ordersValidations from '../../validations/orders/orders'
import ordersControllers from '../../controllers/orders/orders.controllers'

const router = express.Router()

router.get(
  '/',
  validateRequest(ordersValidations.getAllOrders),
  ordersControllers.getAllOrders
)

router.post(
  '/',
  authRequired,
  validateRequest(ordersValidations.createOrder),
  ordersControllers.createOrder
)

export default router
