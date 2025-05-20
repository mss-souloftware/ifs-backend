// src/controllers/orders.ts
import { Request, Response } from 'express';
import { createOrder, getOrders } from '../services/orderService';

export const createOrderController = async (req: Request, res: Response) => {
  try {
    const order = await createOrder(req.body);
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order', error });
  }
};

export const getOrdersController = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};
