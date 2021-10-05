'use strict';
const dbConnector = require('../config/db.config');

exports.create = (guardian, response) => {
    dbConnector.query('INSERT INTO Guardians SET ?', guardian, 
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.update = (id, guardian, response) => {
    dbConnector.query("UPDATE Guardians SET ? WHERE id_patient = ?", [guardian, id],
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.delete = (patientId, response) => {
    dbConnector.query("DELETE FROM Guardians WHERE id_patient = ?", patientId,
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

