const Router = require("express");
const usersController = require("../controllers/users.mock.controller");

const router = Router();

router.post("/", usersController.create);
router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.delete("/:id", usersController.deleteUser);
router.put("/:id", usersController.update);

module.exports = router;
