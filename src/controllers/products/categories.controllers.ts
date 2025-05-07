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

import type { PRODUCT_CATEGORY_TYPE } from '@prisma/client'
import type { InputJsonValue } from '@prisma/client/runtime/library'

type TCreateCategoryBody = {
  name: string
  shortDescription: string
  longDescription: string
  needConsultation: boolean
  type: PRODUCT_CATEGORY_TYPE
  consultationQuestions: InputJsonValue
}

type TUpdateCategoryParams = {
  categoryId: string,
}

type TUpdateCategoryBody = {
  name?: string
  shortDescription?: string
  longDescription?: string
  needConsultation?: boolean
  type?: PRODUCT_CATEGORY_TYPE
  consultationQuestions?: InputJsonValue
}

type TDeleteCategoryParams = {
  categoryId: string
}

type TUpdateCategoryRecommendedProductsBody = Array<{
  productId: number
  description: string
  tags: string[]
}>

type TGetAllCategoryFaqsParams = {
  categoryId: string
}

type TCreateCategoryFaqParams = {
  categoryId: string
}

type TCreateCategoryFaqBody = {
  question: string
  answer: string
}

type TUpdateCategoryFaqParams = {
  categoryId: string
  faqId: string
}

type TUpdateCategoryFaqBody = {
  question?: string
  answer?: string
}

type TDeleteCategoryFaqParams = {
  categoryId: string
  faqId: string
}

const getProductsByCategory = async (
  req: AuthRequest<TUpdateCategoryParams>,
  res: Response
): Promise<Response> => {
  const categoryId = Number(req.params.categoryId)

  try {
    const products = await prisma.products.findMany({
      where: { categoryId }
    })

    const response = okResponse(products)
    return res.status(response.status.code).json(response)
  } catch (error) {
    console.error(error)
    const response = serverErrorResponse('Failed to fetch products')
    return res.status(response.status.code).json(response)
  }
}
// categories controllers
const getAllCategories = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const categories = await prisma.productCategory.findMany()

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
    const categories = await prisma.productCategory.create({
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
    const category = await prisma.productCategory.update({
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
    const category = await prisma.productCategory.delete({
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

// recommended products controllers

const updateCategoryRecommendedProducts = async (
  req: AuthRequest<TUpdateCategoryParams, unknown, TUpdateCategoryRecommendedProductsBody>,
  res: Response
): Promise<Response> => {
  const categoryId = Number(req.params.categoryId)
  const recommendedProducts = req.body

  try {
    await prisma.recommendedProductsOfCategory.deleteMany({
      where: { categoryId }
    })

    for (const recommendedProduct of recommendedProducts) {
      await prisma.recommendedProductsOfCategory.create({
        data: {
          categoryId,
          productId: recommendedProduct.productId,
          description: recommendedProduct.description,
          tags: recommendedProduct.tags
        }
      })
    }

    const response = updateSuccessResponse()
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

// faqs controllers
const getAllCategoryFaqs = async (
  req: AuthRequest<TGetAllCategoryFaqsParams>,
  res: Response
): Promise<Response> => {
  try {
    const faqs = await prisma.categoryFaqs.findMany()

    const response = okResponse(faqs)
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

const createCategoryFaq = async (
  req: AuthRequest<TCreateCategoryFaqParams, unknown, TCreateCategoryFaqBody>,
  res: Response
): Promise<Response> => {
  const categoryId = Number(req.params.categoryId)
  const data = req.body

  try {
    const faq = await prisma.categoryFaqs.create({
      data: {
        categoryId,
        ...data
      }
    })

    const response = createSuccessResponse(faq)
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

const updateCategoryFaq = async (
  req: AuthRequest<TUpdateCategoryFaqParams, unknown, TUpdateCategoryFaqBody>,
  res: Response
): Promise<Response> => {
  const faqId = Number(req.params.faqId)
  const data = req.body

  try {
    const faq = await prisma.categoryFaqs.update({
      where: { id: faqId },
      data
    })

    const response = updateSuccessResponse(faq)
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

const deleteCategoryFaq = async (
  req: AuthRequest<TDeleteCategoryFaqParams>,
  res: Response
): Promise<Response> => {
  const faqId = Number(req.params.faqId)

  try {
    const faq = await prisma.categoryFaqs.delete({
      where: { id: faqId }
    })

    const response = deleteSuccessResponse(faq)
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
  deleteCategory,

  updateCategoryRecommendedProducts,
  getProductsByCategory,
  getAllCategoryFaqs,
  createCategoryFaq,
  updateCategoryFaq,
  deleteCategoryFaq
}
