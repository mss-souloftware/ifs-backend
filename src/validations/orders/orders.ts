// src/validations/orders.ts
import { body } from 'express-validator';

export const createOrderValidation = [
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('productId').isInt().withMessage('Product ID must be an integer'),
  body('quantity').isInt({ gt: 0 }).withMessage('Quantity must be greater than 0'),
  body('totalPrice').isFloat({ gt: 0 }).withMessage('Total price must be greater than 0'),
];
