const express = require("express");
const router = express.Router();
const industryController = require("../controllers/industry.controller");

// POST /api/industry
router.post("/", industryController.createIndustry);

// GET /api/industry
router.get("/", industryController.getAllIndustries);

// PUT /api/industry/:id
router.put("/:id", industryController.updateIndustry);

// DELETE /api/industry/:id
router.delete("/:id", industryController.deleteIndustry);

module.exports = router;
