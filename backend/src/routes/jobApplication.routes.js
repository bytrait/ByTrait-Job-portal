const express = require('express');
const router = express.Router();
const jobApplicationController = require('../controllers/jobApplication.controller');
const verifyStudentTokenFromCookie = require('../middleware/student.middleware');
const verifyCompanyTokenFromHeader = require('../middleware/company.middleware');

// POST /api/job-applications
router.post('/apply', verifyStudentTokenFromCookie, jobApplicationController.applyToJob);
router.post('/check', verifyStudentTokenFromCookie, jobApplicationController.checkIfApplied);
// GET /api/job-applications/my
router.get('/my', verifyStudentTokenFromCookie, jobApplicationController.getMyApplications);

// GET /api/job-applications/job/:jobId
// Optional: only for company/admin use
router.get('/job/:jobId',verifyCompanyTokenFromHeader , jobApplicationController.getApplicationsByJob);
router.get('/applications', verifyCompanyTokenFromHeader, jobApplicationController.getApplicationsWithUserData);
module.exports = router;
