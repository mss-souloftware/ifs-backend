import { S3Client } from '@aws-sdk/client-s3'

import config from './config'

const s3 = new S3Client({
  credentials: {
    accessKeyId: config.S3_ACCESS_KEY_ID,
    secretAccessKey: config.S3_SECRET_ACCESS_KEY
  },
  region: config.S3_BUCKET_REGION
})

export default s3
