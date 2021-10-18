"use strict";

const { logger } = require("../config/winston/winston.config");
const dbConnector = require("../config/db.config");

const getAll = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Users";
        logger.debug(query);
        dbConnector.query(query, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const insert = ({ email, password, name }) => {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO Users (email, password, name) VALUES (?,?,?)";
        logger.debug(query + `, ${JSON.stringify([email, password, name])}`);
        dbConnector.query(query, [email, password, name], (err, result) => {
            if (err) reject(err);
            if (result) {
                resolve(result);
            }
        });
    });
};

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM Users WHERE email = ?";
        logger.debug(query + `, ${JSON.stringify([email])}`);
        dbConnector.query(query, [email], (err, rows) => {
            if (err) reject(err);
            resolve(rows[0]);
        });
    });
};

module.exports = {
    getAll: getAll,
    insert: insert,
    getByEmail: getByEmail,
};
