import * as http from 'http'
import * as express from 'express'
import * as path from 'path'
import * as displayRoutes from 'express-routemap'
import * as bodyParser from 'body-parser'
import * as jwt from 'jsonwebtoken'

import routeSample from './routes/sample.route'

const app: express.Application = express()
const PORT: number = process.env.PORT || 8082

app.use(bodyParser.json())

app.use('/sample', routeSample)

app.post('/auth/getToken', (req, res) => {
  if (req.body.email === 'hello@test.com' && req.body.password === 'test') {
    res.status(200)
        .json({token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6IlRlc3QgVXNlciJ9.J6n4-v0I85zk9MkxBHroZ9ZPZEES-IKeul9ozxYnoZ8'})
  } else {
    res.sendStatus(403)
  }
})

app.get('/getData', (req, res) => {
  const token: string = req.headers.authorization
  if (!token) {
    res.sendStatus(401)
  } else {
    try {
      const decoded = jwt.verify(token.replace('Bearer ', ''), 'secret-key')
      res.status(200)
        .json({data: 'Valid JWT found! This protected data was fetched from the server.'})
    } catch (e) {
      res.sendStatus(401)
    }
  }
})

app.get('/', (req, res) => {
  res.send('jwt dummy server')
})

http.createServer(app).listen(PORT, (error): void => {
  displayRoutes(app)

  if (error) {
    console.error(error)
  } else {
    console.info(`==> 🌎  Listening on port ${PORT}. Open up http://localhost:${PORT}/ in your browser.`)
  }
})
