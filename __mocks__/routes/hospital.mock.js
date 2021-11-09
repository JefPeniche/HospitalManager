const Router = require("express");
const hospitalsController = require("../controllers/hospital.mock.controller");

const router = Router();

router.post("/", hospitalsController.create);
router.get("/", hospitalsController.getAll);
router.get("/:id", hospitalsController.getById);
router.delete("/:id", hospitalsController.deleteHospital);
router.put("/:id", hospitalsController.update);

module.exports = router;
