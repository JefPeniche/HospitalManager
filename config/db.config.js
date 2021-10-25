const { Sequelize } = require("sequelize");
const { logger } = require("./winston/winston.config");
require("dotenv").config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    logging: str => {
      logger.debug(str)
    }
  }, 
);

module.exports = db;