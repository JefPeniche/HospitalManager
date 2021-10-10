const dbConnector = require("../config/db.config");

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnector.query("SELECT * FROM Users", (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};

const insert = ({ email, password, name }) => {
    return new Promise((resolve, reject) => {
        dbConnector.query("INSERT INTO Users (email, password, name) VALUES (?,?,?)", [email, password, name], (err, result) => {
            if (err) reject(err);
            if (result) {
                resolve(result);
            }
        });
    });
};

const getByEmail = (email) => {
    return new Promise((resolve, reject) => {
        dbConnector.query("SELECT * FROM Users WHERE email = ?", [email], (err, rows) => {
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
