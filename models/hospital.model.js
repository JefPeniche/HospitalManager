'use strict';
const dbConnector = require('../config/db.config');

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