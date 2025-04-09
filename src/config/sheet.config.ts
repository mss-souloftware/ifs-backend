import path from 'path'

import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, './keys/superb-virtue-416719-138b5d222784.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
})

const sheets = google.sheets({ version: 'v4', auth })
const drive = google.drive({ version: 'v3', auth })

export default {
  sheets,
  drive
}
