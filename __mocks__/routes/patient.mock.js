const Router = require("express");
const patientsController = require("../controllers/patient.mock.controller");

const router = Router();

router.post("/", patientsController.create);
router.get("/", patientsController.getAll);
router.get("/:id", patientsController.getById);
router.delete("/:id", patientsController.deletePatient);
router.put("/:id", patientsController.update);

module.exports = router;
