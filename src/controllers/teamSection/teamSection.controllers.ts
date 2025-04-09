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

type TCreateMemberBody = {
  name: string
  position: string
  picture?: string
  bio: string
}

type TUpdateMemberParams = {
  memberId: string
}

type TUpdateMemberBody = {
  name?: string
  position?: string
  picture?: string
  bio?: string
}

type TDeleteMemberParams = {
  memberId: string
}

const getAllTeamMembers = async (req: AuthRequest, res: Response): Promise<Response> => {
  try {
    const teamSections = await prisma.teamSection.findMany()

    const response = okResponse(teamSections)
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

const createTeamMember = async (
  req: AuthRequest<unknown, unknown, TCreateMemberBody>,
  res: Response
): Promise<Response> => {
  const data = req.body

  try {
    const teamSection = await prisma.teamSection.create({
      data
    })

    const response = createSuccessResponse(teamSection)
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

const updateTeamMember = async (
  req: AuthRequest<TUpdateMemberParams, unknown, TUpdateMemberBody>,
  res: Response
): Promise<Response> => {
  const memberId = Number(req.params.memberId)
  const data = req.body

  try {
    const teamSection = await prisma.teamSection.update({
      where: { id: memberId },
      data
    })

    const response = updateSuccessResponse(teamSection)
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

const deleteTeamMember = async (
  req: AuthRequest<TDeleteMemberParams>,
  res: Response
): Promise<Response> => {
  const memberId = Number(req.params.memberId)

  try {
    const teamSection = await prisma.teamSection.delete({
      where: { id: memberId }
    })

    const response = deleteSuccessResponse(teamSection)
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
  getAllTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
}
