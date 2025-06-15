const express = require('express');
const router = express.Router();
const { applyToCampusJob,getCampusApplicationsWithStudentData } = require('../controllers/campusJobApplication.controller');
const verifyStudentTokenFromCookie = require('../middleware/student.middleware');

// POST /api/campus-jobs/:jobId/apply
router.post('/apply/:jobId', verifyStudentTokenFromCookie, applyToCampusJob);
router.get('/applications/:jobId', verifyStudentTokenFromCookie, getCampusApplicationsWithStudentData);

module.exports = router;
