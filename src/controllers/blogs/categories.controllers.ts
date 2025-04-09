import {
  createSuccessResponse,
  deleteSuccessResponse,
  okResponse,
  serverErrorResponse,
  updateSuccessResponse
} from 'generic-response'

import prisma from '../../config/database.config'

import type { AuthRequest } from '../../interfaces/auth-request'
import type { Response } from 'express'

type TCreateCategoryBody = {
  name: string
}

type TUpdateCategoryParams = {
  categoryId: string
}

type TUpdateCategoryBody = {
  name?: string
}

type TDeleteCategoryParams = {
  categoryId: string
}

const getAllCategories = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const categories = await prisma.blogCategories.findMany()

    const response = okResponse(categories)
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

const createCategory = async (
  req: AuthRequest<unknown, unknown, TCreateCategoryBody>,
  res: Response
): Promise<Response> => {
  const data = req.body

  try {
    const categories = await prisma.blogCategories.create({
      data
    })

    const response = createSuccessResponse(categories)
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

const updateCategory = async (
  req: AuthRequest<TUpdateCategoryParams, unknown, TUpdateCategoryBody>,
  res: Response
): Promise<Response> => {
  const categoryId = Number(req.params.categoryId)
  const data = req.body

  try {
    const category = await prisma.blogCategories.update({
      where: { id: categoryId },
      data
    })

    const response = updateSuccessResponse(category)
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

const deleteCategory = async (
  req: AuthRequest<TDeleteCategoryParams>,
  res: Response
): Promise<Response> => {
  const categoryId = Number(req.params.categoryId)

  try {
    const category = await prisma.blogCategories.delete({
      where: { id: categoryId }
    })

    const response = deleteSuccessResponse(category)
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
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory
}
