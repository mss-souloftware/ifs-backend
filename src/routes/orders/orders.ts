<<<<<<< HEAD
// src/routes/orders.ts
import { Router } from 'express';
import { createOrderController, getOrdersController } from '../../controllers/orders/orders';
import { createOrderValidation } from '../../validations/orders/orders';
import { validate } from '../middlewares/validate';

const router = Router();

router.post('/orders', createOrderValidation, validate, createOrderController);
router.get('/orders', getOrdersController);

export default router;
=======
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
>>>>>>> ae61c98b84bbb5d60d8c73d10e8a42282244eefb
