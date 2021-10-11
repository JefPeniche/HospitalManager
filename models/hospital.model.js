'use strict';
const dbConnector = require('../config/db.config');ç
const querySelectHospital = "SELECT Hospitals.*,"
    +" Hospitals.name as hospital_name, Hospitals.city as hospital_city FROM Hospitals"  

exports.create = (hospital, response) => {
    dbConnector.query("INSERT INTO Hospitals SET ?", hospital, 
        (error, result) => {
            if(error) 
                response(error);
            else  
                response(false, result.insertId)
        }
    );
}

exports.findAll = (response) => {
    dbConnector.query("SELECT * FROM Hospitals", 
        (error, result) => {
            if(error) 
                response(error);
            else
                response(false, result);
        }
    );
}

exports.find = (hospitalId, response) => {
    dbConnector.query( querySelectHospital+" WHERE Hospitals.id = ?", hospitalId,
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.update = (id, hospital, response) => {
    dbConnector.query("UPDATE Hospitals SET ? WHERE id = ?", [hospital, id],
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

exports.delete = (hospitalId, response) => {
    dbConnector.query("DELETE FROM Hospitals WHERE id = ?", hospitalId,
        (error, result) => {
            error? response(error) : response(false, result);
        }
    )
}

