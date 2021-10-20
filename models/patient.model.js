"use strict";

const { logger } = require("../config/winston/winston.config");
const dbConnector = require("../config/db.config");
const querySelectPatients =
    "SELECT Patients.*, Guardians.name as guardian_name, Guardians.phone as guardian_phone," +
    " TIMESTAMPDIFF (YEAR, Patients.birthday, CURDATE()) as age," +
    " Hospitals.name as hospital_name, Hospitals.city as hospital_city FROM Patients" +
    " INNER JOIN Guardians ON Patients.id = Guardians.id_patient" +
    " INNER JOIN Hospitals ON Patients.id_hospital = Hospitals.id";

exports.create = (patient, response) => {
    logger.debug(`Patient Model create(${JSON.stringify(patient)},  ${typeof response})`);

    const query = "INSERT INTO Patients SET ?";
    logger.debug(query + `, ${JSON.stringify(patient)}`);
    dbConnector.query(query, patient, (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.findAll = (response) => {
    logger.debug(`Patient Model findAll(${typeof response})`);

    logger.debug(querySelectPatients);
    dbConnector.query(querySelectPatients, (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.find = (patientId, response) => {
    logger.debug(`Patient Model find(${patientId},  ${typeof response})`);

    const query = querySelectPatients + " WHERE Patients.id = ?";
    logger.debug(query + `, {${patientId}}`);
    dbConnector.query(query, patientId, (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.update = (id, patient, response) => {
    logger.debug(`Patient Model update(${id}, ${JSON.stringify(patient)},  ${typeof response})`);

    const query = "UPDATE Patients SET ? WHERE id = ?";
    logger.debug(query + `, ${JSON.stringify([patient, id])}`);
    dbConnector.query(query, [patient, id], (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.delete = (patientId, response) => {
    logger.debug(`Patient Model update(${patientId}, ${typeof response})`);

    const query = "DELETE FROM Patients WHERE id = ?";
    logger.debug(query + `, {${patientId}}`);
    dbConnector.query(query, patientId, (error, result) => {
        error ? response(error) : response(false, result);
    });
};
