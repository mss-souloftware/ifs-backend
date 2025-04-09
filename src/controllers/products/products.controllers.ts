import {
  createSuccessResponse,
  deleteSuccessResponse,
  notFoundResponse,
  okResponse,
  serverErrorResponse,
  updateSuccessResponse
} from 'generic-response'

import prisma from '../../config/database.config'

import type { AuthRequest } from '../../interfaces/auth-request'
import type { Response } from 'express'
import type { InputJsonValue } from '@prisma/client/runtime/library'

type TGetSingleProductParams = {
  productId: string
}

type TCreateProductBody = {
  categoryId: number
  thumbnail: string
  name: string
  description: string
  price: number
  directCheckout: boolean
  reviewedBy: number[]
  consultationQuestions: InputJsonValue
}

type TUpdateProductParams = {
  productId: string
}

type TUpdateProductBody = {
  categoryId?: number
  thumbnail?: string
  name?: string
  description?: string
  price?: number
  directCheckout?: boolean
  reviewedBy?: number[]
  consultationQuestions?: InputJsonValue
}

type TDeleteProductParams = {
  productId: string
}

const getAllProducts = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const products = await prisma.products.findMany()

    const response = okResponse(products)
    return res.status(response.status.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      const response = serverErrorResponse(error.message)
      return res.status(response.status.code).json(response)
    } else {
      const response = serverErrorResponse('An unexpected error occurred')
      return res.status(response.status.code).json(response)
    }
  }
}

const getSingleProduct = async (
  req: AuthRequest<TGetSingleProductParams>,
  res: Response
): Promise<Response> => {
  const productId = Number(req.params.productId)

  try {
    const product = await prisma.products.findUnique({
      where: { id: productId },
      include: {
        ProductCategory: true,
        ProductFaqs: true,
        ProductInfo: true,
        ProductReviewedBy: true
      }
    })

    if (product === null) {
      const response = notFoundResponse('product not found')
      return res.status(response.status.code).json(response)
    }

    const response = okResponse(product)
    return res.status(response.status.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      const response = serverErrorResponse(error.message)
      return res.status(response.status.code).json(response)
    } else {
      const response = serverErrorResponse('An unexpected error occurred')
      return res.status(response.status.code).json(response)
    }
  }
}

const createProduct = async (
  req: AuthRequest<unknown, unknown, TCreateProductBody>,
  res: Response
): Promise<Response> => {
  const { reviewedBy, ...data } = req.body

  try {
    const product = await prisma.products.create({
      data
    })

    if (reviewedBy !== undefined) {
      await prisma.productReviewedBy.createMany({
        data: reviewedBy.map((userId) => ({
          teamId: userId,
          productId: product.id
        }))
      })
    }

    const response = createSuccessResponse(product)
    return res.status(response.status.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      const response = serverErrorResponse(error.message)
      return res.status(response.status.code).json(response)
    } else {
      const response = serverErrorResponse('An unexpected error occurred')
      return res.status(response.status.code).json(response)
    }
  }
}

const updateProduct = async (
  req: AuthRequest<TUpdateProductParams, unknown, TUpdateProductBody>,
  res: Response
): Promise<Response> => {
  const productId = Number(req.params.productId)
  const { reviewedBy, ...data } = req.body

  try {
    const product = await prisma.products.update({
      where: { id: productId },
      data
    })

    if (reviewedBy !== undefined) {
      await prisma.productReviewedBy.deleteMany({
        where: { productId }
      })

      await prisma.productReviewedBy.createMany({
        data: reviewedBy.map((userId) => ({
          teamId: userId,
          productId: product.id
        }))
      })
    }

    const response = updateSuccessResponse(product)
    return res.status(response.status.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      const response = serverErrorResponse(error.message)
      return res.status(response.status.code).json(response)
    } else {
      const response = serverErrorResponse('An unexpected error occurred')
      return res.status(response.status.code).json(response)
    }
  }
}

const deleteProduct = async (
  req: AuthRequest<TDeleteProductParams>,
  res: Response
): Promise<Response> => {
  const productId = Number(req.params.productId)

  try {
    const product = await prisma.products.delete({
      where: { id: productId }
    })

    const response = deleteSuccessResponse(product)
    return res.status(response.status.code).json(response)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
      const response = serverErrorResponse(error.message)
      return res.status(response.status.code).json(response)
    } else {
      const response = serverErrorResponse('An unexpected error occurred')
      return res.status(response.status.code).json(response)
    }
  }
}

export default {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct
}
