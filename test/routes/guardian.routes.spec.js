const supertest = require('supertest')
const { app, server } = require('../../server.js')
const db = require('../../config/db.config.js')

const api = supertest(app)

describe('Test patients routes /api/patients', () => {
  afterAll(() => {
    server.close()
    db.end();
  })

  test('GET all guardians returned as json',async () => {
    await api.get('/api/guardians').expect(200).expect('Content-Type', /application\/json/)
  })
  
  test('GET all guardians', async () => {
    const { body } = await api.get('/api/guardians')
    expect(body).toHaveProperty('guardians')
    expect(body.guardians).toHaveLength(5);
  })
  
  test('GET guardian by Id = 1',async () => {
    const id = 1
    const response = await api.get(`/api/guardians/${id}`)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body.id).toBe(id)
  })
  
  test('POST a new guardian',async () => {
    const guardian = {
      name: 'Daniel Poot',
      phone: '9992351678',
    }

    const response = await api.post('/api/guardians').send(guardian)
    const { body, status } = response
    console.log(response)
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
    const response = await api.put(`/api/guardian/${id}`).send(guardian)
    console.log(response)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Updated Successfully')
  })

  test('DELETE a guardian by id = 1',async () => {
    const id = 1
    const response = await api.delete(`/api/guardians/${id}`)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Deleted successfully.')
  })
})
