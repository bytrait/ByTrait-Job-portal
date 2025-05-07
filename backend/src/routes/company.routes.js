const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const verifyCompany = require('../middleware/company.middleware');
const upload = require('../middleware/upload.middleware');

// Profile update route
router.put('/profile', verifyCompany, upload.single('image'), companyController.updateProfile);
router.get('/profile', verifyCompany, companyController.getCompanyProfile);

module.exports = router;
