const supertest = require('supertest')
const app = require('./app.js')
const { db } = require('./db')

const request = supertest(app)

let req

describe('Server endpoints', () => {
  beforeAll(async (done) => {
    await db.sync({ force: true })
    done()
  })

  describe('Getting all surveys', () => {
    it('should return a 200 status code', async (done) => {
      const res = await request.get('/surveys')
      expect(res.status).toBe(200)
      done()
    })

    it('should return an array', async (done) => {
      const res = await request.get('/surveys')
      expect(res.body).toHaveLength(0)
      done()
    })
  })
})
