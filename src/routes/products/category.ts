import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'

import categoriesValidations from '../../validations/products/categories'
import categoriesControllers from '../../controllers/products/categories.controllers'
import authRequired from '../../middlewares/authRequired.middleware'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

const router = express.Router()

// faqs routes
router.get(
  '/:categoryId/faqs',
  validateRequest(categoriesValidations.getAllCategoryFaqs),
  categoriesControllers.getAllCategoryFaqs
)
router.post(
  '/:categoryId/faqs',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(categoriesValidations.createCategoryFaq),
  categoriesControllers.createCategoryFaq
)
router.patch(
  '/:categoryId/faqs/:faqId',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(categoriesValidations.updateCategoryFaq),
  categoriesControllers.updateCategoryFaq
)
router.delete(
  '/:categoryId/faqs/:faqId',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(categoriesValidations.deleteCategoryFaq),
  categoriesControllers.deleteCategoryFaq
)

// recommended products routes
router.patch(
  '/:categoryId/recommended-products',
  validateRequest(categoriesValidations.updateCategoryRecommendedProducts),
  categoriesControllers.updateCategoryRecommendedProducts
)

// categories routes
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
