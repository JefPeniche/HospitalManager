const express = require('express');
const router = express.Router();
const patientController =   require('../controllers/patient.controller');

//CREATE
router.post('/', patientController.create);

//READ
router.get('/', patientController.findAll);
router.get('/:id', patientController.find);

//UPDATE
router.put('/:id', patientController.update);

//DELETE
router.delete('/:id', patientController.delete);

module.exports = router;