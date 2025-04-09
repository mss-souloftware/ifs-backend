import Joi from 'joi'

const login = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
})

const signup = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
})

const forgotPassword = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email().required()
  })
})

const verifyOtp = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required()
  })
})

const resendOtp = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    email: Joi.string().email().required()
  })
})

const resetPassword = Joi.object({
  query: Joi.object({}),
  params: Joi.object({}),
  body: Joi.object({
    newPassword: Joi.string().required()
  })
})

export default {
  login,
  signup,
  forgotPassword,
  verifyOtp,
  resendOtp,
  resetPassword
}
