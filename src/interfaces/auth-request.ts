import type { Request } from 'express'

import type { USER_ROLES } from '@prisma/client'

export interface AuthRequest<P = unknown, ResBody = unknown, ReqBody = unknown, ReqQuery = unknown>
  extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: {
    userId: number
    role: USER_ROLES
  }
}
