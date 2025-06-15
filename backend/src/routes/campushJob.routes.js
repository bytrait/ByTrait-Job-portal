const express = require('express');
const router = express.Router();
const campusJobcontroller = require('../controllers/campusJob.controller');
const verifyStudentTokenFromCookie = require('../middleware/student.middleware');

// Create a new campus job (TPO)
router.post('/jobs',verifyStudentTokenFromCookie, campusJobcontroller.createCampusJob);
router.get('/my-campus-jobs', verifyStudentTokenFromCookie, campusJobcontroller.getCampusJobs);
// Get a campus job by ID
router.get('/jobs/:id', verifyStudentTokenFromCookie, campusJobcontroller.getCampusJobById);
// Update a campus job by ID
router.put('/jobs/:id', verifyStudentTokenFromCookie, campusJobcontroller.updateCampusJob);
// Delete a campus job by ID
router.delete('/jobs/:id', verifyStudentTokenFromCookie, campusJobcontroller.deleteCampusJob);
module.exports = router;