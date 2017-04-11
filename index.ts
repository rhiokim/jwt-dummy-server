// const http = require('http')
import * as http from 'http'
import * as express from 'express'
import * as path from 'path'
import * as displayRoutes from 'express-routemap'
// const displayRoutes = require('express-routemap')

import routeSample from './routes/sample.route'

const app: express.Application = express()
const PORT: number = process.env.PORT || 8082

// const routeSample = require('./routes/sample.route')

app.use('/sample', routeSample)

app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('Hi World, I\'m seed-api-server')
})

http.createServer(app).listen(PORT, (): void => {
  displayRoutes(app)
})
