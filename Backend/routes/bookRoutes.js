const express = require("express");
const router = express.Router();
const controller = require("../controllers/bookController");
const { isAdmin } = require("../middleware/roleMiddleware");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", isAdmin, controller.create);
router.put("/:id", isAdmin, controller.update);
router.delete("/:id", isAdmin, controller.remove);

module.exports = router;
