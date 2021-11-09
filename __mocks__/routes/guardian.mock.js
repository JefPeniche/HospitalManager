const Router = require("express");
const guardiansController = require("../controllers/guardian.mock.controller");

const router = Router();

router.post("/", guardiansController.create);
router.get("/", guardiansController.getAll);
router.get("/:id", guardiansController.getById);
router.delete("/:id", guardiansController.deleteGuardian);
router.put("/:id", guardiansController.update);

module.exports = router;
