const express = require('express');
const router = express.Router();
const { applyToCampusJob } = require('../controllers/campusJobApplication.controller');
const verifyStudentTokenFromCookie = require('../middleware/student.middleware');

// POST /api/campus-jobs/:jobId/apply
router.post('/:jobId/apply',verifyStudentTokenFromCookie, applyToCampusJob);

module.exports = router;
