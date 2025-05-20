import {
    createSuccessResponse,
    notFoundResponse,
    okResponse,
    serverErrorResponse,
  } from 'generic-response'
  import prisma from '../../config/database.config'
  import type { AuthRequest } from '../../interfaces/auth-request'
  import type { Response } from 'express'
  
  type TCreateOrderBody = {
    productId: number
    quantity: number
    orders: any
  }
  
  const getAllOrders = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const orders = await prisma.orders.findMany()
      const response = okResponse(orders)
      return res.status(response.status.code).json(response)
    } catch (error) {
      const response = serverErrorResponse('Failed to fetch orders')
      return res.status(response.status.code).json(response)
    }
  }
  
  const createOrder = async (req: AuthRequest, res: Response): Promise<Response> => {
    try {
      const userId = req.user?.userId
  
      if (!userId) {
        const response = serverErrorResponse('User not authenticated')
        return res.status(response.status.code).json(response)
      }
  
      const { productId, quantity } = req.body as TCreateOrderBody
  
      const order = await prisma.orders.create({
        data: {
          productId,
          quantity,
          userId, // Now it's guaranteed to be a number
        },
      })
  
      const response = createSuccessResponse(order)
      return res.status(response.status.code).json(response)
    } catch (error) {
      console.error('Create Order Error:', error)
      const response = serverErrorResponse('Failed to create order')
      return res.status(response.status.code).json(response)
    }
  }
  
  
  export default {
    getAllOrders,
    createOrder,
  }
  