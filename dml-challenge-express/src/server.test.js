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
    it('should return a 200 status code', async () => {
      const res = await request.get('/surveys')
      expect(res.status).toBe(200)
    })

    it('should return an array', async () => {
      const res = await request.get('/surveys')
      expect(res.body).toHaveLength(0)
    })
  })

  describe('Creating users/surveys', () => {
    const data = {
      first: 'Joe',
      last: 'Schmoe',
      email: 'Joe@schmoe.com'
    }
    it('should return a 200 status code for valid creation', async () => {
      const res = await request.post('/surveys').send(data)
      expect(res.status).toBe(201)
    })

    it('should return the newly saved user', async () => {
      const res = await request.post('/surveys').send(data)
      expect(res.body).not.toBeNull()
      expect(res.body).toHaveProperty('first')
      expect(res.body.first).toBe(data.first)
      expect(res.body.response).toBeNull()
      expect(res.body.uuid).toHaveLength(36)
    })

    describe('retrieval of users after creation', () => {
      it('should return all the users that have been added', async () => {
        const res = await request.get('/surveys')
        console.log(res.body)
        expect(res.body).toHaveLength(2)
      })
    })
  })

  describe('Patch request for saving a users survey response', () => {

  })
})
