const express = require("express");
const router = express.Router();
const jobController = require("../controllers/job.controller");
const verifyCompany = require('../middleware/company.middleware');
const verifyStudentTokenFromCookie = require("../middleware/student.middleware");

router.post("/", verifyCompany, jobController.createJob);
router.get("/jobdescription/:id",verifyStudentTokenFromCookie,jobController.getJobById)
router.get("/companyjob", verifyCompany, jobController.getalljobsbycompany);
router.get("/filter", jobController.filterJobs);
router.get("/myjobs", verifyStudentTokenFromCookie, jobController.getMyAppliedJobs);
module.exports = router;
