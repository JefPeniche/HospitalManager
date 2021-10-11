const supertest = require('supertest')
const { app, server } = require('../../server.js')
const db = require('../../config/db.config.js')

const api = supertest(app)

describe('Test users routes /api/users', () => {
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
  
})