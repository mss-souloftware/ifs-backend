import express from 'express'

import categoryRouter from './category'
import productsRouter from './products'

const router = express.Router()

// routes
router.use('/categories', categoryRouter)
router.use('/', productsRouter)

export default router
