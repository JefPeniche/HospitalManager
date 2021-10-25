const { DataTypes } = require("sequelize");
const Patients = require('./patient.model')
const db = require("../config/db.config");

const Guardians = db.define('Guardians', {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  id_patient: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    references: {
      model: Patients,
      key: 'id', 
    }
  }
})

Guardians.belongsTo(Patients, {
  foreignKey: 'id_patient',
  foreignKeyConstraint: 'Guardians_ibfk_1',
  onDelete: 'CASCADE'
})

Guardians.removeAttribute("id");

module.exports = Guardians
