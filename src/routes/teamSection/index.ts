import express from 'express'

import teamSectionRouter from './teamSection'

const router = express.Router()

// routes
router.use('/', teamSectionRouter)

export default router
