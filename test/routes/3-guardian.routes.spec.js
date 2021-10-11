const supertest = require('supertest')
const { app, server } = require('../../server.js')
const db = require('../../config/db.config.js')

const api = supertest(app)

describe('Guardian routes', () => {
  let token
  beforeAll(async () => {
    const user = {
      email: 'daniel10.-@gmai.com',
      password: '123456'
    }
    const response = await api.post('/api/users/login').send(user)
    token = response.body.succesfull
  })

  afterAll(async () => {
    server.close()
    db.end();
  })

  test('GET all guardians returned as json',async () => {
    await api.get('/api/guardians').expect(200).expect('Content-Type', /application\/json/).set('user_token', token)
  })
  
  test('GET all guardians', async () => {
    const { body } = await api.get('/api/guardians').set('user_token', token)
    expect(body).toHaveProperty('guardians')
    expect(body.guardians).toHaveLength(4);
  })
  
  test('GET guardian by Id = 1',async () => {
    const id = 1
    const response = await api.get(`/api/guardians/${id}`).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body.id).toBe(id)
  })
  
  test('POST a new guardian',async () => {
    const guardian = {
      name: 'Daniel Poot',
      phone: '9992351678',
    }

    const response = await api.post('/api/guardians').send(guardian).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('guardian_id')
    expect(body.guardian_id).not.toBeNaN()
  })

  test('PUT a guardian',async () => {
    const id = 1
    const guardian = {
      name: 'Karina Canche Canche',
      phone: '9995236458',
    }
    const response = await api.put(`/api/guardian/${id}`).send(guardian).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Updated Successfully')
  })

  test('DELETE a guardian by id = 1',async () => {
    const id = 1
    const response = await api.delete(`/api/guardians/${id}`).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Deleted successfully.')
  })
});