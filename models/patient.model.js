const { DataTypes } = require("sequelize");
const Hospitals = require('./hospital.model')
const db = require("../config/db.config");

const Patients = db.define('Patients', {
  id: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  names: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  second_last_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  sex: {
    type: DataTypes.ENUM('M', 'F'),
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  inscription_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  id_hospital: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: Hospitals,
      key: 'id'
    }
  }
})

module.exports = Patients
