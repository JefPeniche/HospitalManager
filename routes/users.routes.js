const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const middleware = require("./middleware");

router.post("/register", async (req, res) => {
    userController.register(req, res);
});

router.post("/login", async (req, res) => {
    userController.login(req, res);
});

router.use(middleware.checkToken);

router.get("/", async (req, res) => {
    userController.getAll(req, res);
});

module.exports = router;
