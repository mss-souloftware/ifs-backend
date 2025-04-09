import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

import pagesValidations from '../../validations/pages/pages'
import pagesControllers from '../../controllers/pages/pages.controllers'

const router = express.Router()

router.get('/', validateRequest(pagesValidations.getPage), pagesControllers.getPage)
router.patch(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(pagesValidations.updatePage),
  pagesControllers.updatePage
)

export default router
