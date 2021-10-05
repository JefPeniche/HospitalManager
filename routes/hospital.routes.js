const express = require('express');
const router = express.Router();
const hospitalController =   require('../controllers/hospital.controller');

//CREATE
router.post('/', hospitalController.create);

//READ
router.get('/', hospitalController.findAll);

module.exports = router;