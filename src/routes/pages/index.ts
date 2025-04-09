import express from 'express'

import pagesRouter from './pages'

const router = express.Router()

// routes
router.use('/', pagesRouter)

export default router
