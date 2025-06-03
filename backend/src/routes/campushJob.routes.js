const express = require('express');
const router = express.Router();
const campusJobcontroller = require('../controllers/campusJob.controller');
const verifyStudentTokenFromCookie = require('../middleware/student.middleware');

// Create a new campus job (TPO)
router.post('/jobs',verifyStudentTokenFromCookie, campusJobcontroller.createCampusJob);
router.get('/my-campus-jobs', verifyStudentTokenFromCookie, campusJobcontroller.getCampusJobs);
module.exports = router;