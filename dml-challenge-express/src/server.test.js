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
    it('should return a 201 status code for valid creation', async () => {
      const res = await request.post('/surveys').send(data)
      expect(res.status).toBe(201)
    })

    it('should return the newly saved user', async () => {
      const res = await request.post('/surveys').send(data)
      expect(res.body).not.toBeNull()
      expect(res.body).toHaveProperty('first')
      expect(res.body.first).toBe(data.first)
      expect(res.body.response).toBe(undefined)
      expect(res.body.uuid).toHaveLength(36)
    })

    describe('retrieval of users after creation', () => {
      it('should return all the users that have been added', async () => {
        const res = await request.get('/surveys')
        expect(res.body).toHaveLength(2)
      })
    })
  })

  describe('Patch request for saving a users survey response', async () => {
    let uuid
    beforeAll(async () => {
      const { body } = await request.get('/surveys')
      uuid = body[0].uuid
    })

    it('should return a 404 status code for an invalid requests', async () => {
      const res = await request.patch('/surveys/938932').send({ answer: 'gold' })
      expect(res.status).toBe(404)
    })

    it('should return a 200 status code for a valid request', async () => {
      const res = await request.patch(`/surveys/${uuid}`).send({ answer: 'gold' })
      expect(res.status).toBe(200)
    })

    it('should have updated the users response', async () => {
      const { body } = await request.get('/surveys')
      expect(body[0].response).toBe('gold')
    })
  })
})
