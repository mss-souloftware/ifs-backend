/* eslint-disable @typescript-eslint/no-non-null-assertion */

import env from 'dotenv'
import path from 'path'

env.config({
  path: path.join(
    __dirname,
    `../../.env${process.env.NODE_ENV !== undefined ? `.${process.env.NODE_ENV}` : ''}`
  )
})

const config = {
  PORT: process.env.PORT!,
  FRONTEND_URL: process.env.FRONTEND_URL!,
  BACKEND_URL: process.env.BACKEND_URL!,

  JWT_SECRET: process.env.JWT_SECRET!,
  SPREAD_SHEET_ID: process.env.SPREAD_SHEET_ID!
}

export default config
