const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const verifyCompany = require('../middleware/company.middleware');

router.post("/", verifyCompany, jobController.createJob);
router.get("/companyjob", verifyCompany, jobController.getalljobsbycompany);
router.get("/filter", jobController.filterJobs);

module.exports = router;
