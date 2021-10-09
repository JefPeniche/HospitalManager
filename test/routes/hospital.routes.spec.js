const supertest = require('supertest')
const { app, server } = require('../../server.js')
const db = require('../../config/db.config.js')

const api = supertest(app)

describe('Test hospital routes', () => {
  afterAll(() => {
    server.close()
    db.end();
  })
  
  test('Get /api/hospitals returned as json', async () => {
    await api.get('/api/hospitals').expect(200).expect('Content-Type', /application\/json/)
  })

  test('Get /api/hospitals there are 4 hospitals', async () => {
    const { body } = await api.get('/api/hospitals')
    expect(body).toHaveProperty('hospitals')
    expect(body.hospitals).toHaveLength(4);
  })

  test('Get /api/hospitals can be added new hospital', async () => {
    const newHospital = {
      name: 'Hospital Pensiones',
      city: 'Merida'
    }
    const response = await api.post('/api/hospitals').send(newHospital)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('id')
    expect(body.id).not.toBeNaN()
  })

})

