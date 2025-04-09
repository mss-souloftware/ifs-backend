import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'

import categoriesValidations from '../../validations/blogs/categories'
import categoriesControllers from '../../controllers/blogs/categories.controllers'
import authRequired from '../../middlewares/authRequired.middleware'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

const router = express.Router()

router.get(
  '/',
  validateRequest(categoriesValidations.getAllCategories),
  categoriesControllers.getAllCategories
)
router.post(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(categoriesValidations.createCategory),
  categoriesControllers.createCategory
)
router.patch(
  '/:categoryId',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(categoriesValidations.updateCategory),
  categoriesControllers.updateCategory
)
router.delete(
  '/:categoryId',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(categoriesValidations.deleteCategory),
  categoriesControllers.deleteCategory
)

export default router
