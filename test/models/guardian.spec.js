const db = require('../../config/db.config.js')
const Guardian = require('../../models/guardian.model.js')

describe('Test Guardan Model', () => { 
  afterAll((done) => {
    db.end(done);
  });
  
  test('should be create ', async () => {
    const guardian = {
      id_patient: 1,
      name: 'Daniel Poot',
      phone: '9992351678'
    }
    function callback(error, results) {
      expect(error).not.toBeTruthy()
      expect(results.affectedRows).toBe(1)
    }
    Guardian.create(guardian, callback)
  })

  test('should be update', () => {
    const id = 1
    const guardian = {
      name: 'Daniel Poot',
      phone: '9992351678'
    }
    function callback(error, results) {
      expect(error).not.toBeTruthy()
      expect(results.affectedRows).toBe(1)
    }
    Guardian.update(id ,guardian, callback)
  })
  
  test('should be update', () => {
    const id = 1
    const guardian = {
      name: 'Daniel Poot',
      phone: '9992351678'
    }
    function callback(error, results) {
      expect(error).not.toBeTruthy()
      expect(results.affectedRows).toBe(1)
    }
    Guardian.update(id ,guardian, callback)
  })
  
})