const express = require("express");
const userMockRoutes = require("./routes/users.mock");
const guardiansMockRoutes = require("./routes/guardian.mock");
const hospitalsMockRoutes = require("./routes/hospital.mock");
const patientsMockRoutes = require("./routes/patient.mock");

const app = express();

// Middlewares for
// You can run the project and see the response
// in the console because we use Morgan for that
app.use(express.json());

app.use("/api/users", userMockRoutes);
app.use("/api/guardians", guardiansMockRoutes);
app.use("/api/hospitals", hospitalsMockRoutes);
app.use("/api/patients", patientsMockRoutes);

module.exports = app;
