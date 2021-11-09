const MockDBConnection = require("../mock/mock_db");

const Guardian = MockDBConnection.define("Guardians", [
  {
    id: 1,
    name: "Daniel Antonio",
    phone: "9992351780"
  },
  {
    id: 2,
    name: "Alvar Peniche",
    phone: "9992351680"
  }
])

module.exports = Guardian;