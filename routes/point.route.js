const pointController = require("../controllers/point.controller");

const express = require("express");
const router = express.Router();

router.get("/", pointController.getAllPoints);
router.post("/", pointController.createPoint);
router.get("/:id", pointController.getPoint);
router.patch("/:id", pointController.updatePoint);
router.delete("/:id", pointController.deletePoint);

module.exports = router;
