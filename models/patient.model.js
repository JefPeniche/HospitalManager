'use strict';
const dbConnector = require('../config/db.config');
const querySelectPatients = "SELECT Patients.*, Guardians.name as guardian_name, Guardians.phone as guardian_phone,"
    +" TIMESTAMPDIFF (YEAR, Patients.birthday, CURDATE()) as age,"
    +" Hospitals.name as hospital_name, Hospitals.city as hospital_city FROM Patients"  
    +" INNER JOIN Guardians ON Patients.id = Guardians.id_patient"
    +" INNER JOIN Hospitals ON Patients.id_hospital = Hospitals.id";

exports.create = (patient, response) => {
    dbConnector.query('INSERT INTO Patients SET ?', patient, 
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.findAll = (response) => {
    dbConnector.query(querySelectPatients, 
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.find = (patientId, response) => {
    dbConnector.query( querySelectPatients+" WHERE Patients.id = ?", patientId,
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.update = (id, patient, response) => {
    dbConnector.query("UPDATE Patients SET ? WHERE id = ?", [patient, id],
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.delete = (patientId, response) => {
    dbConnector.query("DELETE FROM Patients WHERE id = ?", patientId,
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

