import express from 'express'

import validateRequest from '../../middlewares/validateRequest.middleware'
import authRequired from '../../middlewares/authRequired.middleware'

import blogsValidations from '../../validations/blogs/blogs'
import blogsControllers from '../../controllers/blogs/blogs.controllers'

const router = express.Router()

// routes
router.get('/', validateRequest(blogsValidations.getAllBlogs), blogsControllers.getAllBlogs)
router.post(
  '/',
  authRequired,
  validateRequest(blogsValidations.createBlog),
  blogsControllers.createBlog
)
router.patch(
  '/:blogId',
  authRequired,
  validateRequest(blogsValidations.updateBlog),
  blogsControllers.updateBlog
)
router.delete(
  '/:blogId',
  authRequired,
  validateRequest(blogsValidations.deleteBlog),
  blogsControllers.deleteBlog
)

export default router
