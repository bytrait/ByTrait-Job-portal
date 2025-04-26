const express = require("express");
const router = express.Router();
const industryController = require("../controllers/industry.controller");

// Later: Add admin auth middleware like `adminAuth` here
router.post("/", industryController.createIndustry);
router.get("/", industryController.getAllIndustries);

module.exports = router;
