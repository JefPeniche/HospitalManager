const supertest = require('supertest')
const { app, server } = require('../../server.js')
const db = require('../../config/db.config.js')

const api = supertest(app)

describe('Test patients routes /api/patients', () => {
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
  
  test('Get all patients returned as json', async () => {
    await api.get('/api/patients').expect(200).expect('Content-Type', /application\/json/).set('user_token', token)
  })

  test('GET all patients', async () => {
    const { body } = await api.get('/api/patients').set('user_token', token)
    expect(body).toHaveProperty('patients')
    expect(body.patients).toHaveLength(5);
  })
  
  test('GET patient by Id = 1', async () => {
    const id = 1
    const response = await api.get(`/api/patients/${id}`).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    console.log(body)
    expect(body.id).toBe(id)
  })

  
  test('POST a patient', async () => {
    const patient = {
      names: 'Daniel Antonio',
      last_name: 'Poot',
      second_last_name: 'Uc',
      sex: 'M',
      birthday: '1999-03-06',
      inscription_date: '2021-10-10',
      id_hospital: 1,
      guardian_name: 'Karina  Canche',
      guardian_phone: '9995236458',
    }

    const response = await api.post('/api/patients').send(patient).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('patient_id')
    expect(body.patient_id).not.toBeNaN()

  })

  test('PUT a patient', async () => {
    const id = 1
    const patient = {
      names: 'Miguel Angel',
      last_name: 'Poot',
      second_last_name: 'Pech',
      sex: 'M',
      birthday: '2005-05-30',
      inscription_date: '2021-06-10',
      id_hospital: 1,
      guardian_name: 'Karina  Canche',
      guardian_phone: '9995236458',
    }
    const response = await api.put(`/api/patients/${id}`).send(patient).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Updated Successfully')
    
  })

  test('DELETE a patient by id = 1', async () => {
    const id = 1
    const response = await api.delete(`/api/patients/${id}`).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Deleted successfully.')
  })
})