import express from 'express'

import authRouter from './auth'
import meRouter from './me'

const router = express.Router()

// routes
router.use('/auth', authRouter)
router.use('/me', meRouter)

export default router
