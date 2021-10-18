"use strict";

const { logger } = require("../config/winston/winston.config");
const dbConnector = require("../config/db.config");
const querySelectGuardians = "SELECT Guardians.*," + " Guardians.name as guardians_name, Guardians.phone as guardians_phone FROM Guardians";

exports.create = (guardian, response) => {
    const query = "INSERT INTO Guardians SET ?";
    logger.debug(query + `, ${JSON.stringify(guardian)}`);
    dbConnector.query(query, guardian, (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.findAll = (response) => {
    const query = "SELECT * FROM Guardians";
    logger.debug(query);
    dbConnector.query(query, (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.find = (guardianId, response) => {
    const query = querySelectGuardians + " WHERE Guardians.id_patient = ?";
    logger.debug(query + `, [${guardianId}]`);
    dbConnector.query(query, guardianId, (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.update = (id, guardian, response) => {
    const query = "UPDATE Guardians SET ? WHERE id_patient = ?";
    logger.debug(query + `, ${JSON.stringify([guardian, id])}`);
    dbConnector.query(query, [guardian, id], (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.delete = (guardianId, response) => {
    const query = "DELETE FROM Guardians WHERE id_patient = ?";
    logger.debug(query + `, {${[guardianId]}}`);
    dbConnector.query(query, guardianId, (error, result) => {
        error ? response(error) : response(false, result);
    });
};
