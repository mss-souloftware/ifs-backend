import express from 'express'

import categoryRouter from './category'
import blogsRouter from './blogs'

const router = express.Router()

// routes
router.use('/categories', categoryRouter)
router.use('/', blogsRouter)

export default router
