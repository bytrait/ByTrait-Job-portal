const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const verifyCompany = require('../middleware/company.middleware');

router.post("/", verifyCompany, jobController.createJob);
module.exports = router;
