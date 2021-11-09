const MockDBConnection = require("../mock/mock_db");

const Hospital = MockDBConnection.define("Hospitals", [
    {
        id: 1,
        name: "IMSS",
        city: "Valladolid"
    },
    {
        id: 2,
        name: "IMSS",
        city: "Mérida"
    }
]);

module.exports = Hospital;