const express = require('express');
const router = express.Router();
const { sendOtpForRegistration, verifyOtpAndLogin, registerCompanyAndLogin, sendOtpForLogin } = require('../controllers/auth.controller');

router.post('/send-otp-register', sendOtpForRegistration);
router.post('/send-otp-login', sendOtpForLogin);
router.post('/verify-otp-and-login', verifyOtpAndLogin);
router.post('/register-company-and-login', registerCompanyAndLogin);
module.exports = router;
