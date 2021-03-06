const express = require("express");
const router = express.Router();
const guardianController = require("../controllers/guardian.controller");
const middleware = require("./middleware");

router.use(middleware.checkToken);

//CREATE
router.post("/", guardianController.create);

//READ
router.get("/", guardianController.findAll);
router.get("/:id", guardianController.find);

//UPDATE
router.put("/:id", guardianController.update);

//DELETE
router.delete("/:id", guardianController.delete);

module.exports = router;
