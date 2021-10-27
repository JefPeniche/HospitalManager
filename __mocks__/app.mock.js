const express = require("express");
const userMockRoutes = require("./routes/users.mock");

const app = express();

// Middlewares for
// You can run the project and see the response
// in the console because we use Morgan for that
app.use(express.json());

app.use("/api/users", userMockRoutes);

module.exports = app;
