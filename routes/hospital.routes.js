const express = require("express");
const router = express.Router();
const hospitalController = require("../controllers/hospital.controller");
const middleware = require("./middleware");

router.use(middleware.checkToken);

//CREATE
router.post("/", hospitalController.create);

//READ
router.get("/", hospitalController.findAll);
router.get("/:id", hospitalController.find);

//UPDATE
router.put("/:id", hospitalController.update);

//DELETE
router.delete("/:id", hospitalController.delete);

module.exports = router;
