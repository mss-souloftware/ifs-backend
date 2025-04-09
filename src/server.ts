import { createServer } from 'http'

import config from './config/config'

import app from './app'

const server = createServer(app)

server.listen(config.PORT, () => {
  console.info(`listening on ${config.PORT}`)
})
