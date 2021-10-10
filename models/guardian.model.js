"use strict";
const dbConnector = require("../config/db.config");

exports.create = (guardian, response) => {
  dbConnector.query(
    "INSERT INTO Guardians SET ?",
    guardian,
    (error, result) => {
      error ? response(error) : response(false, result);
    }
  );
};

exports.findAll = (response) => {
  dbConnector.query("SELECT * FROM Guardians", (error, result) => {
    error ? response(error) : response(false, result);
  });
};

exports.find = (guardianId, response) => {
  dbConnector.query(
    querySelectPatients + " WHERE Guardians.id = ?",
    guardianId,
    (error, result) => {
      error ? response(error) : response(false, result);
    }
  );
};

exports.update = (id, guardian, response) => {
  dbConnector.query(
    "UPDATE Guardians SET ? WHERE id_patient = ?",
    [guardian, id],
    (error, result) => {
      error ? response(error) : response(false, result);
    }
  );
};

exports.delete = (guardianId, response) => {
  dbConnector.query(
    "DELETE FROM Guardians WHERE id_patient = ?",
    guardianId,
    (error, result) => {
      error ? response(error) : response(false, result);
    }
  );
};
