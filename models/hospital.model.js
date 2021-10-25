const { DataTypes } = require("sequelize");
const db = require("../config/db.config");

const Hospitals = db.define('Hospitals', {
  id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(50),
    allowNull: false
  }
})

module.exports = Hospitals
