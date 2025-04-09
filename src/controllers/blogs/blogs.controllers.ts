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

type TCreateBlogBody = {
  title: string
  thumbnail: string
  content: string
  categoryId: number
}

type TUpdateMemberParams = {
  blogId: string
}

type TUpdateMemberBody = {
  title?: string
  thumbnail?: string
  content?: string
  categoryId?: number
}

type TDeleteMemberParams = {
  blogId: string
}

const getAllBlogs = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const blogs = await prisma.blogs.findMany()

    const response = okResponse(blogs)
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

const createBlog = async (
  req: AuthRequest<unknown, unknown, TCreateBlogBody>,
  res: Response
): Promise<Response> => {
  const data = req.body

  try {
    const blogs = await prisma.blogs.create({
      data
    })

    const response = createSuccessResponse(blogs)
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

const updateBlog = async (
  req: AuthRequest<TUpdateMemberParams, unknown, TUpdateMemberBody>,
  res: Response
): Promise<Response> => {
  const blogId = Number(req.params.blogId)
  const data = req.body

  try {
    const blog = await prisma.blogs.update({
      where: { id: blogId },
      data
    })

    const response = updateSuccessResponse(blog)
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

const deleteBlog = async (
  req: AuthRequest<TDeleteMemberParams>,
  res: Response
): Promise<Response> => {
  const blogId = Number(req.params.blogId)

  try {
    const blogs = await prisma.blogs.delete({
      where: { id: blogId }
    })

    const response = deleteSuccessResponse(blogs)
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
  getAllBlogs,
  createBlog,
  updateBlog,
  deleteBlog
}
