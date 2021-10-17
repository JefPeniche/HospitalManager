const Hospital = require('../models/hospital.model');
const { allKeysHaveValue, isValidId }  = require('../utilities/index')

exports.create = (request, response) => {    
    const data = { 
        name: request.body.name, 
        city: request.body.city 
    }

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`)

    if(!allKeysHaveValue(data)) return response.status(400).send({ message: 'Incomplete data.' });
    
    const sendHospitalIdOrError = (error, hospital_id) => error ? response.status(500).send({ message: 'DB internal error.'}) : response.status(200).json({ id: hospital_id })
    Hospital.create(data, sendHospitalIdOrError)
}

exports.findAll = (request, response) => {    
  const sendHospitalsOrError = (error, hospitals)=> error ? response.status(500).send({ error: true, message: 'DB internal error.' }) : response.status(200).json({ hospitals: hospitals })
  Hospital.findAll(sendHospitalsOrError);
}


exports.find = (request, response) => {
    const id = request.params.id;
    if(!isValidId(id)) return response.status(400).send({ message: 'Invalid id.' });

    const sendHospitalOrError = (error, hospital) => {
      if (error) return response.status(500).send({ message: 'DB internal error.' + error})
      if(hospital.length > 0) return response.status(200).json(hospital[0]) 
      return response.status(200).json({});
    }
    Hospital.find(id, sendHospitalOrError)
}

exports.update = (request, response) => {
    const id = request.params.id;

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`)

    if(!isValidId(id)) return response.status(400).send({ message: 'Invalid id.' });
    bodyhospital = getDatahospital(request.body);

    if(!bodyhospital.isCorrect) return response.status(400).send({ message: 'Incorrect data.' });
        
    const sendSuccesMessageOrError = error => error ? response.status(500).send({ message: 'DB internal error.' }) : response.status(200).json({ message: 'Updated Successfully'})
    Hospital.update(id, bodyhospital.data, sendSuccesMessageOrError)
}

exports.delete = (request, response) => {
    const id = request.params.id;

    if(!isValidId(id)) return response.status(400).send({ message: 'Invalid id.' });

    const sendSuccesMessageOrError = error => error ? response.status(500).send({ message: 'DB internal error. ' }) : response.status(200).json({ message: 'Deleted successfully.' })
    Hospital.delete(id, sendSuccesMessageOrError)
}

const getDatahospital = (body) => {
    const data = {
        name : body.name,
        city : body.city,
    }
    
    return {isCorrect: allKeysHaveValue(data), data: data}
}