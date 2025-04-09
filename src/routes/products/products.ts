import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'

import productsValidations from '../../validations/products/products'
import productsControllers from '../../controllers/products/products.controllers'
import rolesRequired from '../../middlewares/rolesRequired.middleware'

const router = express.Router()

router.get(
  '/',
  validateRequest(productsValidations.getAllProducts),
  productsControllers.getAllProducts
)
router.get(
  '/:productId',
  validateRequest(productsValidations.getSingleProduct),
  productsControllers.getSingleProduct
)
router.post(
  '/',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(productsValidations.createProduct),
  productsControllers.createProduct
)
router.patch(
  '/:productId',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(productsValidations.updateProduct),
  productsControllers.updateProduct
)
router.delete(
  '/:productId',
  authRequired,
  rolesRequired(['ADMIN']),
  validateRequest(productsValidations.deleteProduct),
  productsControllers.deleteProduct
)

export default router
