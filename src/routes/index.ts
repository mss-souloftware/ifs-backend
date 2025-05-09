import express from 'express'

import usersRouter from './users'
import teamSectionRouter from './teamSection'
import pagesRouter from './pages'
import blogsRouter from './blogs'
import productsRouter from './products'
import ordersRoutes from './orders/orders'

const router = express.Router()

// routes
router.use('/users', usersRouter)
router.use('/team-section', teamSectionRouter)
router.use('/pages', pagesRouter)
router.use('/blogs', blogsRouter)
router.use('/products', productsRouter)
router.use('/orders', ordersRoutes)


export default router
