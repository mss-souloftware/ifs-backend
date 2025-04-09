import { okResponse, serverErrorResponse, updateSuccessResponse } from 'generic-response'

import prisma from '../../config/database.config'

import type { AuthRequest } from '../../interfaces/auth-request'
import type { Response } from 'express'
import type { InputJsonValue } from '@prisma/client/runtime/library'

type TGetPageQueryParams = {
  name: string
}

type TUpdatePageQueryParams = {
  name: string
}

type TUpdatePageBody = {
  content: InputJsonValue
}

const getPage = async (
  req: AuthRequest<unknown, unknown, unknown, TGetPageQueryParams>,
  res: Response
): Promise<Response> => {
  const { name } = req.query

  try {
    const page = await prisma.pages.findUnique({
      where: { name }
    })

    const response = okResponse(page)
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

const updatePage = async (
  req: AuthRequest<unknown, unknown, TUpdatePageBody, TUpdatePageQueryParams>,
  res: Response
): Promise<Response> => {
  const { name } = req.query
  const { content } = req.body

  try {
    const page = await prisma.pages.findUnique({
      where: { name }
    })

    console.log({ page })

    if (page === null) {
      await prisma.pages.create({
        data: {
          name,
          content
        }
      })
    } else {
      await prisma.pages.update({
        where: { name },
        data: {
          content
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

export default {
  getPage,
  updatePage
}
