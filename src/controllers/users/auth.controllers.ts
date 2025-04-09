import {
  badRequestResponse,
  createSuccessResponse,
  notFoundResponse,
  okResponse,
  serverErrorResponse,
  unauthorizedResponse,
  updateSuccessResponse
} from 'generic-response'
import moment from 'moment'
import jwt from 'jsonwebtoken'

import config from '../../config/config'
import prisma from '../../config/database.config'

import type { Response } from 'express'
import type { AuthRequest } from '../../interfaces/auth-request'

type TLoginBody = {
  email: string
  password: string
}

type TSignupBody = {
  name: string
  email: string
  password: string
}

type TForgotPasswordBody = {
  email: string
}

type TVerifyOtpBody = {
  email: string
  otp: string
}

type TResendOtpBody = {
  email: string
}

type TResetPasswordBody = {
  newPassword: string
}

const generateOTP = (): string => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString()
  return otp
}

const createOTP = async (userId: number): Promise<string> => {
  try {
    const otp = generateOTP()
    const expirationDateTime = moment().add(5, 'minutes').toISOString()

    await prisma.userOTP.updateMany({
      where: { userId },
      data: { isExpired: true }
    })

    await prisma.userOTP.create({
      data: {
        userId,
        otp,
        expirationDateTime
      }
    })

    return otp
  } catch (error) {
    throw new Error('Failed to create OTP')
  }
}

const expireOTP = async (id: number): Promise<void> => {
  await prisma.userOTP.update({
    where: { id },
    data: { isExpired: true }
  })
}

const login = async (
  req: AuthRequest<unknown, unknown, TLoginBody>,
  res: Response
): Promise<Response> => {
  const loginData = req.body

  try {
    const { email, password } = loginData

    const user = await prisma.users.findFirst({
      where: { email },
      include: {
        UserPassword: true
      }
    })

    if (user === null) {
      const response = unauthorizedResponse('incorrect email or password')
      return res.status(response.status.code).json(response)
    }

    if (user?.UserPassword?.password !== password) {
      const response = unauthorizedResponse('incorrect email or password')
      return res.status(response.status.code).json(response)
    }

    const payload = {
      userId: user.id,
      username: user.name,
      role: user.role
    }

    const token = jwt.sign(payload, config.JWT_SECRET)

    const response = okResponse({ token, user: payload }, 'Login Success.')
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

const signup = async (
  req: AuthRequest<unknown, unknown, TSignupBody>,
  res: Response
): Promise<Response> => {
  const signupData = req.body

  try {
    const { name, email, password } = signupData

    const user = await prisma.users.findUnique({
      where: { email }
    })

    if (user !== null) {
      const response = badRequestResponse('Email already exists')
      return res.status(response.status.code).json(response)
    }

    await prisma.users.create({
      data: {
        name,
        email,
        UserPassword: {
          create: {
            password
          }
        }
      }
    })

    const response = createSuccessResponse(null, 'Account created successfully.')
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

const forgotPassword = async (
  req: AuthRequest<unknown, unknown, TForgotPasswordBody>,
  res: Response
): Promise<Response> => {
  const { email } = req.body

  try {
    const user = await prisma.users.findUnique({ where: { email } })

    if (user === null) {
      const response = notFoundResponse('User not found.')
      return res.status(response.status.code).json(response)
    }

    const otp = await createOTP(user.id)
    // send token over email

    const response = okResponse(null, `OTP sent to your email. otp: ${otp}`)
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

const verifyOtp = async (
  req: AuthRequest<unknown, unknown, TVerifyOtpBody>,
  res: Response
): Promise<Response> => {
  const { email, otp } = req.body

  try {
    const user = await prisma.users.findUnique({
      where: { email }
    })

    if (user === null) {
      const response = notFoundResponse('User not found.')
      return res.status(response.status.code).json(response)
    }

    const userOTP = await prisma.userOTP.findFirst({
      where: {
        userId: user.id,
        otp,
        isExpired: false
      }
    })

    if (userOTP === null) {
      const response = unauthorizedResponse('Invalid OTP or OTP expired')
      return res.status(response.status.code).json(response)
    }

    await expireOTP(userOTP.id)

    const payload = {
      userId: user.id,
      role: user.role
    }

    const token = jwt.sign(payload, config.JWT_SECRET)

    const response = okResponse({ token, user: payload }, 'OTP verified.')
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

const resendOtp = async (
  req: AuthRequest<unknown, unknown, TResendOtpBody>,
  res: Response
): Promise<Response> => {
  const { email } = req.body

  try {
    const user = await prisma.users.findUnique({ where: { email } })

    if (user === null) {
      const response = notFoundResponse('User not found')
      return res.status(response.status.code).json(response)
    }

    const otp = await createOTP(user.id)
    // await sendOtpEmail(email, otp);

    const response = okResponse({ otp }, 'OTP resent successfully')
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

const resetPassword = async (
  req: AuthRequest<unknown, unknown, TResetPasswordBody>,
  res: Response
): Promise<Response> => {
  const { newPassword } = req.body
  const user = req.user

  if (user === undefined) {
    const response = unauthorizedResponse()
    return res.status(response.status.code).json(response)
  }

  const { userId } = user

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: {
        UserPassword: true
      }
    })

    if (user === null) {
      const response = notFoundResponse('User not found.')
      return res.status(response.status.code).json(response)
    }

    await prisma.userPassword.update({
      where: { userId: user.id },
      data: { password: newPassword }
    })

    const response = updateSuccessResponse(null, 'Password reset successfully.')
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
  login,
  signup,
  forgotPassword,
  verifyOtp,
  resendOtp,
  resetPassword
}
