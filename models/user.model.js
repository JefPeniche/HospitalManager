const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Users = db.define(
  "Users",
  {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    }
  }
)

module.exports = Users
