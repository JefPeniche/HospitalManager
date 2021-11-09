const MockDBConnection = require("../mock/mock_db");

const Patient = MockDBConnection.define('Patients', [
  {
    id: 1,
    names: "Juan",
    last_name: "Perez",
    second_last_name: "Concha",
    sex: "M",
    birthday: "2005-05-30",
    inscription_date: "2021-06-30",
    id_hospital: 1
  },
  {
    id: 2,
    names: "Rosa",
    last_name: "Vazquez",
    second_last_name: "Zapata",
    sex: "F",
    birthday: "2005-06-31",
    inscription_date: "2021-06-31",
    id_hospital: 1
  }
])

module.exports = Patient;