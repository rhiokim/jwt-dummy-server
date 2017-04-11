/*
 * refs, http://brianflove.com/2016/11/08/typescript-2-express-node/
 */
import * as express from 'express'

const router: express.Router = express.Router()

router.route('/')
  .get((req: express.Request, res: express.Response, next: express.NextFunction): void => {
    res.send('success')
  })

router.get('/:id', (req: express.Request, res: express.Response): void => {
  res.json(req.params)
})

export default router
