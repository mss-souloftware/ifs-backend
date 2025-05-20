// src/routes/orders.ts
import { Router } from 'express';
import { createOrderController, getOrdersController } from '../../controllers/orders/orders';
import { createOrderValidation } from '../../validations/orders/orders';
import { validate } from '../middlewares/validate';

const router = Router();

router.post('/orders', createOrderValidation, validate, createOrderController);
router.get('/orders', getOrdersController);

export default router;
