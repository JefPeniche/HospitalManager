"use strict";
const mysql = require("mysql");

const dbConnector = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "06201725Pu.",
    database: "DigitalHospital",
});

dbConnector.connect(function(error) {  
    if (error) throw error;  
});

module.exports = dbConnector;
