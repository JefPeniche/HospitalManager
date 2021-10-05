const Patient = require('../models/patient.model');
const Guardian = require('../models/guardian.model');

exports.create = (request, response) => {    
    bodyPatient = getDataPatient(request.body);
    bodyGuardian = getDataGuardian(request.body);
    
    if(!bodyPatient.isCorrect || !bodyGuardian.isCorrect)
        response.status(400).send({ message: 'Incorrect data.' });
    
    else Patient.create(bodyPatient.data, 
        (error, resultPatient) => {  
            if (error)  response.status(500).send(
                { message: 'DB internal error. ' + error});
            
            else  Guardian.create( {id_patient: resultPatient.insertId ,...bodyGuardian.data},
                (error, resultGuardian)=>{
                    if (error)  response.status(500).send(
                        { message: ' DB internal error. ' + error});
                    else  response.status(200).json(
                        { patient_id: resultPatient.insertId}
                    );
                }
            )
        }
    );
}

exports.findAll = (request, response) => {
    Patient.findAll(
        (error, patients) => {
            if (error)  response.status(500).send(
                { message: 'DB internal error.'});
            else  response.status(200).json(
                { patients: patients }
            );
        }
    )
}

exports.find = (request, response) => {
    const id = request.params.id;
    if(typeof id === "undefined" || id<=0)
        response.status(400).send({ message: 'Invalid id.' });
    
    else Patient.find(id,
        (error, patient) => {
            if (error)  response.status(500).send(
                { message: 'DB internal error.' + error});
            else{
                if(patient.length > 0)  response.status(200).json(
                    patient[0]
                );
                else response.status(200).json({});
            }
        }
    )
}

exports.update = (request, response) => {
    const id = request.params.id;
    if(typeof id === "undefined" || id<=0)
        response.status(400).send({ message: 'Invalid id.' });
    else{
        bodyPatient = getDataPatient(request.body);
        bodyGuardian = getDataGuardian(request.body);

        if(!bodyPatient.isCorrect || !bodyGuardian.isCorrect)
            response.status(400).send({ message: 'Incorrect data.' });
        
        else Patient.update(id, bodyPatient.data, 
            (error) => {  
                if (error)  response.status(500).send(
                    { message: 'DB internal error.' });
                else  Guardian.update(id, bodyGuardian.data,
                    (error, result)=>{
                        if (error)  response.status(500).send(
                            { message: 'DB internal error.' });
                        else  response.status(200).json(
                            { message: 'Updated Successfully'}
                        );
                    }
                )
            }
        );
    }
}


exports.delete = (request, response) => {
    const id = request.params.id;
    if(typeof id === "undefined" || id<=0)
        response.status(400).send({ message: 'Invalid id.' });
    
    else Guardian.delete(id, 
        (error) => {
            if (error)  response.status(500).send(
                { message: 'DB internal error. ' });
            
            else  Patient.delete(id,
                (error) => {
                    if (error)  response.status(500).send(
                        { message: 'DB internal error. '});
                    
                    else  response.status(200).json(
                        {  message: 'Deleted successfully.' }
                    );
                }
            )
        }
    )
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

    
    return {isCorrect: validateData(data), data: data}
}

const getDataGuardian = (body) => {
    const data = {
        name : body.guardian_name,
        phone : body.guardian_phone
    }

    return {isCorrect: validateData(data), data: data}
}

const validateData = (data) =>{
    let isCorrect = true;
    if((Object.keys(data)).some((key)=> typeof data[key] === 'undefined') ||
        (Object.keys(data)).some((key)=> data[key].length === 0))
            isCorrect = false;
    
    else if(data.sex && data.sex!=='M' && data.sex!=='F')
        isCorrect = false
    
    return isCorrect;
}
