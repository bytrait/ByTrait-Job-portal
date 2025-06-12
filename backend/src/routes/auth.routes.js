const express = require('express');
const router = express.Router();
const { sendOtpForRegistration, verifyOtpAndLogin, registerCompanyAndLogin, sendOtpForLogin, getUserInfo, getCompanyInfo } = require('../controllers/auth.controller');
const verifyStudentTokenFromCookie = require('../middleware/student.middleware');
const verifyCompany = require('../middleware/company.middleware');

router.post('/send-otp-register', sendOtpForRegistration);
router.post('/send-otp-login', sendOtpForLogin);
router.post('/verify-otp-and-login', verifyOtpAndLogin);
router.post('/register-company-and-login', registerCompanyAndLogin);

router.get('/user', verifyStudentTokenFromCookie, getUserInfo);
router.get('/company',verifyCompany, getCompanyInfo);
module.exports = router;
