const pointController = require("../controllers/point.controller");

const express = require("express");
const router = express.Router();

router.get("/", pointController.getAllPoints);
router.post("/create", pointController.createPoint);
router.get("/:id", pointController.getPoint);
router.patch("/update/:id", pointController.updatePoint);
router.delete("/delete/:id", pointController.deletePoint);

module.exports = router;
