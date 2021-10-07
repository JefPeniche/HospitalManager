'use strict';
const mysql = require('mysql');

const dbConnector = mysql.createConnection({  
    host     : 'localhost',  
    user     : 'root',  
    password : 'VmLl78572097',  
    database : 'DigitalHospital'
});

dbConnector.connect(function(error) {  
    if (error) throw error;  
    console.log("DigitalHospital DB is connected...");
});

module.exports = dbConnector;