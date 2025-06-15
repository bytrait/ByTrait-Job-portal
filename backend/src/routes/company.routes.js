const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const verifyCompany = require('../middleware/company.middleware');
const upload = require('../middleware/upload.middleware');
const verifyStudentTokenFromCookie = require('../middleware/student.middleware');

// Profile update route
router.put('/profile', verifyCompany, upload.single('image'), companyController.updateProfile);
router.get('/profile', verifyCompany, companyController.getCompanyProfile);
router.get('/companies', verifyStudentTokenFromCookie,companyController.getPendingCompanies);
router.put('/:id/approve', verifyStudentTokenFromCookie,companyController.approveCompany);
router.put('/:id/reject', verifyStudentTokenFromCookie,companyController.rejectCompany);

module.exports = router;
