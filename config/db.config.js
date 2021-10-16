"use strict";
const mysql = require("mysql");

const dbConnector = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

dbConnector.connect(function(error) {
    if (error) throw error;
});

module.exports = dbConnector;
