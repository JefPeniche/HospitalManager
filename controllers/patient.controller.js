const Patient = require('../models/patient.model');
const Guardian = require('../models/guardian.model');
const { allKeysHaveValue, isValidId, isSexValid }  = require('../utilities/index')

exports.create = (request, response) => {    
    bodyPatient = getDataPatient(request.body);
    bodyGuardian = getDataGuardian(request.body);

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`)

    if(!bodyPatient.isCorrect || !bodyGuardian.isCorrect) {
      logger.warn('Incomplete data')
      return response.status(400).send({ message: 'Incorrect data.' });
    }
    
    const sendPatientOrError = error => {
      if (error) return  response.status(500).send({message: 'DB internal error. ' + error});
      const data = {id_patient: resultPatient.insertId ,...bodyGuardian.data}
      const updateGuardian = (error, resultGuardian) => error ? response.status(500).send( { message: ' DB internal error. ' + error}) : response.status(200).json({ patient_id: resultPatient.insertId })
      Guardian.create(data,updateGuardian)
    }
    Patient.create(bodyPatient.data, sendPatientOrError)
}

exports.findAll = (request, response) => {
  const sendAllPatientsOrError = (error, patients) => error ? response.status(500).send( { message: 'DB internal error.'}) : response.status(200).json( { patients: patients })
  Patient.findAll(sendAllPatientsOrError)
}

exports.find = (request, response) => {
    const id = request.params.id;
    if(!isValidId(id)) return response.status(400).send({ message: 'Invalid id.' }); 
    
    const sendPatientOrError = (error, patient) => {
      if (error) return response.status(500).send( { message: 'DB internal error.' + error});
      if(patient.length > 0) return response.status(200).json(patient[0]);
      return response.status(200).json({});
    }
    Patient.find(id, sendPatientOrError)
}

exports.update = (request, response) => {
    const id = request.params.id;

    logger.debug(`body: ${hiddenSensitiveData(request.body)}`)

    if(!isValidId(id)) return response.status(400).send({ message: 'Invalid id.' }); 
    bodyPatient = getDataPatient(request.body);
    bodyGuardian = getDataGuardian(request.body);

    if(!bodyPatient.isCorrect || !bodyGuardian.isCorrect) {
      logger.warn('Incomplete data')
      return response.status(400).send({ message: 'Incorrect data.' });
    }
        
    const updatePatientAndGuardian = error => {
      if(error) return response.status(500).send( { message: 'DB internal error.' })
      const updateGuardian = (error, result) =>error ? response.status(500).send({ message: 'DB internal error.' }) : response.status(200).json({ message: 'Updated Successfully'})
      Guardian.update(id, bodyGuardian.data, updateGuardian)
    }
    Patient.update(id, bodyPatient.data, updatePatientAndGuardian);
}


exports.delete = (request, response) => {
    const id = request.params.id;

    if(!isValidId(id)) return response.status(400).send({ message: 'Invalid id.' }); 
    
    const deleteGuardianAndPatient = error => {
      if(error) return response.status(500).send({ message: 'DB internal error. ' })
      const deletePatient = error => error ? response.status(500).send({ message: 'DB internal error. '}) : response.status(200).json({  message: 'Deleted successfully.' })
      Patient.delete(id, error)
    }

    Guardian.delete(id, deleteGuardianAndPatient)
}

const getDataPatient = (body) => {
    const data = {
        names : body.names,
        last_name : body.last_name,
        second_last_name : body.second_last_name,
        sex : body.sex,
        birthday : body.birthday,
        inscription_date : body.inscription_date,
        id_hospital : body.id_hospital,
    }

    const isCorrect = allKeysHaveValue(data) && isSexValid(data.sex)
    
    return {isCorrect, data: data}
}

const getDataGuardian = (body) => {
    const data = {
        name : body.guardian_name,
        phone : body.guardian_phone
    }

    return {isCorrect: allKeysHaveValue(data), data: data}
}