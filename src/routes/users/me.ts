import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'

import meValidations from '../../validations/users/me'
import meControllers from '../../controllers/users/me.controllers'

const router = express.Router()

router.get(
  '/',
  authRequired,
  validateRequest(meValidations.getMyProfile),
  meControllers.getMyProfile
)
router.patch(
  '/',
  authRequired,
  validateRequest(meValidations.updateMyProfile),
  meControllers.updateMyProfile
)

export default router
