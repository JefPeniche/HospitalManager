"use strict";

const { logger } = require("../config/winston/winston.config");
const dbConnector = require("../config/db.config");

const querySelectHospital = "SELECT Hospitals.*," + " Hospitals.name as hospital_name, Hospitals.city as hospital_city FROM Hospitals";

exports.create = (hospital, response) => {
    const query = "INSERT INTO Hospitals SET ?";
    logger.debug(query + `, ${JSON.stringify(hospital)}`);
    dbConnector.query(query, hospital, (error, result) => {
        if (error) response(error);
        else response(false, result.insertId);
    });
};

exports.findAll = (response) => {
    const query = "SELECT * FROM Hospitals";
    logger.debug(query);
    dbConnector.query(query, (error, result) => {
        if (error) response(error);
        else response(false, result);
    });
};

exports.find = (hospitalId, response) => {
    const query = querySelectHospital + " WHERE Hospitals.id = ?";
    logger.debug(query + `, {${hospitalId}}`);
    dbConnector.query(query, hospitalId, (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.update = (id, hospital, response) => {
    const query = "UPDATE Hospitals SET ? WHERE id = ?";
    logger.debug(query + `, ${JSON.stringify([hospital, id])}`);
    dbConnector.query(query, [hospital, id], (error, result) => {
        error ? response(error) : response(false, result);
    });
};

exports.delete = (hospitalId, response) => {
    const query = "DELETE FROM Hospitals WHERE id = ?";
    logger.debug(query + `, {${hospitalId}}`);
    dbConnector.query(query, hospitalId, (error, result) => {
        error ? response(error) : response(false, result);
    });
};
