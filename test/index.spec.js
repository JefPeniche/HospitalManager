const supertest = require('supertest')
const { app, server } = require('../server.js')
const db = require('../config/db.config.js')

const api = supertest(app)

describe('Test All routes', () => {
  let token
  afterAll(() => {
    server.close()
    db.end();
  })

  test('POST register a user ', async () => {
    const newUser = {
      name: 'daniel',
      email: 'daniel10.-@gmai.com',
      password: '123456'
    }
    const response = await api.post('/api/users/register').send(newUser)  
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).not.toBeUndefined()
    expect(body.affectedRows).not.toBeNaN()
    expect(body.inserteId).not.toBeNaN()
  })
  
  test('POST login as user', async () => {
    const user = {
      email: 'daniel10.-@gmai.com',
      password: '123456'
    }
    const response = await api.post('/api/users/login').send(user)  
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).not.toBeUndefined()
    expect(body).toHaveProperty('succesfull')
    token = body.succesfull
    expect(body).toHaveProperty('done', 'Welcome again!')
  })
  
  test('GET all users', async () => {
    const response = await api.get('/api/users').set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).not.toBeUndefined()
  })

  
  test('Get all patients returned as json', async () => {
    await api.get('/api/patients').expect(200).expect('Content-Type', /application\/json/).set('user_token', token)
  })

  test('GET all patients', async () => {
    const { body } = await api.get('/api/patients').set('user_token', token)
    expect(body).toHaveProperty('patients')
    expect(body.patients).toHaveLength(5);
  })
  
  test('GET patient by Id = 2', async () => {
    const id = 2
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
    const id = 2
    const patient = {
      names: 'Miguel Angel',
      last_name: 'Poot',
      second_last_name: 'Pech',
      sex: 'M',
      birthday: '2005-05-30',
      inscription_date: '2021-06-10',
      id_hospital: 3,
      guardian_name: 'Karina  Canche',
      guardian_phone: '9995236458',
    }
    const response = await api.put(`/api/patients/${id}`).send(patient).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Updated Successfully')
    
  })

  test('DELETE a patient by id = 2', async () => {
    const id = 2
    const response = await api.delete(`/api/patients/${id}`).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Deleted successfully.')
  })

  test('GET all guardians returned as json',async () => {
    await api.get('/api/guardians').expect(200).expect('Content-Type', /application\/json/).set('user_token', token)
  })
  
  test('GET all guardians', async () => {
    const { body } = await api.get('/api/guardians').set('user_token', token)
    expect(body).toHaveProperty('guardians')
    expect(body.guardians).toHaveLength(5);
  })
  
  // test('GET guardian by Id = 4',async () => {
  //   const id = 4
  //   const response = await api.get(`/api/guardians/${id}`).set('user_token', token)
  //   const { body, status } = response
  //   expect(status).toBe(200)
  //   expect(body.id).toBe(id)
  // })
  
  // test('POST a new guardian',async () => {
  //   const guardian = {
  //     guardian_name: 'Daniel Poot',
  //     guardian_phone: '9992351678',
  //   }

  //   const response = await api.post('/api/guardians').send(guardian).set('user_token', token)
  //   const { body, status } = response
  //   console.log(response)
  //   expect(status).toBe(200)
  //   expect(body).toHaveProperty('guardian_id')
  //   expect(body.guardian_id).not.toBeNaN()
  // })

  test('PUT a guardian',async () => {
    const id = 5
    const guardian = {
      id_patient: id,
      guardian_name: 'Karina Canche Canche',
      guardian_phone: '9995236458',
    }
    const response = await api.put(`/api/guardian/${id}`).send(guardian).set('user_token', token)
    console.log(response)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Updated Successfully')
  })

  test('DELETE a guardian by id = 2',async () => {
    const id = 2
    const response = await api.delete(`/api/guardians/${id}`).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Deleted successfully.')
  })

  test('Get /api/hospitals returned as json', async () => {
    await api.get('/api/hospitals').expect(200).expect('Content-Type', /application\/json/).set('user_token', token)
  })

  test('Get /api/hospitals there are 4 hospitals', async () => {
    const { body } = await api.get('/api/hospitals').set('user_token', token)
    expect(body).toHaveProperty('hospitals')
    expect(body.hospitals).toHaveLength(4);
  }) 
  
  test('Get /api/hospitals by id = 2', async () => {
    const id = 2
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
    const id = 2
    const hospital = {
      name: 'Hospital Mexicano',
      city: 'Mexico'
    }
    const response = await api.put(`/api/hospitals/${id}`).send(hospital).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Updated Successfully')
  })

  test('DELETE a hospital by id = 5', async () => {
    const id = 5
    const response = await api.delete(`/api/hospitals/${id}`).set('user_token', token)
    const { body, status } = response
    expect(status).toBe(200)
    expect(body).toHaveProperty('message', 'Deleted successfully.')
  })
});