import { ForbiddenError } from '@/application/errors'
import { app } from '@/main/config/app'
import { auth } from '@/main/middlewares'
import request from 'supertest'

describe('Authentication Middleware', () => {
  it('should return 403 if authorization header is missing', async () => {
    app.get('/fake_route', auth, (req, res) => {
      res.json(req.locals)
    })

    const { status, body } = await request(app)
      .get('/fake_route')
      .send({ token: 'valid_token' })

    expect(status).toBe(403)
    expect(body.error).toBe(new ForbiddenError().message)
  })
})
