import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'

import authValidations from '../../validations/users/auth'
import authControllers from '../../controllers/users/auth.controllers'
import authRequired from '../../middlewares/authRequired.middleware'

const router = express.Router()

router.post('/login', validateRequest(authValidations.login), authControllers.login)
router.post('/signup', validateRequest(authValidations.signup), authControllers.signup)
router.post(
  '/forgot-password',
  validateRequest(authValidations.forgotPassword),
  authControllers.forgotPassword
)
router.post('/verify-otp', validateRequest(authValidations.verifyOtp), authControllers.verifyOtp)
router.post('/resend-otp', validateRequest(authValidations.resendOtp), authControllers.resendOtp)
router.post(
  '/reset-password',
  authRequired,
  validateRequest(authValidations.resetPassword),
  authControllers.resetPassword
)

export default router
