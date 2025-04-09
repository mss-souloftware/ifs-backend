import { unauthorizedResponse } from 'generic-response'

import type { Response, NextFunction } from 'express'
import type { USER_ROLES } from '@prisma/client'
import type { AuthRequest } from '../interfaces/auth-request'

const rolesRequired =
  (rolesArray: USER_ROLES[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    const { user } = req

    if (user === undefined || !rolesArray.includes(user.role)) {
      const response = unauthorizedResponse('Access denied. Insufficient permissions.')
      return res.status(response.status.code).json(response)
    }

    next()
  }

export default rolesRequired
