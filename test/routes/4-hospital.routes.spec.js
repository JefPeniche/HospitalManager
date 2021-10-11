const supertest = require('supertest')
const { app, server } = require('../../server.js')
const db = require('../../config/db.config.js')

const api = supertest(app)

describe('Hospital routes', () => {
  let token

  beforeAll(async () => {
    const user = {
      email: 'daniel10.-@gmai.com',
      password: '123456'
    }
    const response = await api.post('/api/users/login').send(user)
    token = response.body.succesfull
  })

  afterAll(() => {
    server.close()
    db.end();
  })
  
  test('Get /api/hospitals returned as json', async () => {
    await api.get('/api/hospitals').expect(200).expect('Content-Type', /application\/json/).set('user_token', token)
  })

  test('Get /api/hospitals there are 4 hospitals', async () => {
    const { body } = await api.get('/api/hospitals').set('user_token', token)
    expect(body).toHaveProperty('hospitals')
    expect(body.hospitals).toHaveLength(4);
  }) 
  
  test('Get /api/hospitals by id = 1', async () => {
    const id = 1
    const response = await api.get(`/api/hospitals/${id}`).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body.id).toBe(id)
  })
  
  test('POST /api/hospitals can be added new hospital', async () => {
    const newHospital = {
      name: 'Hospital Pensiones',
      city: 'Merida'
    }
    const response = await api.post('/api/hospitals').send(newHospital).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('id')
    expect(body.id).not.toBeNaN()
  })

  test('PUT a hospital', async () => {
    const id = 1
    const hospital = {
      name: 'Hospital Mexicano',
      city: 'Mexico'
    }
    const response = await api.put(`/api/hospitals/${id}`).send(hospital).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Updated Successfully')
  })

  test('DELETE a hospital by id = 1', async () => {
    const id = 1
    const response = await api.delete(`/api/hospitals/${id}`).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Deleted successfully.')
  })

});