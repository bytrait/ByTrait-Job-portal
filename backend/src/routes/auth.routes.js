const express = require('express');
const router = express.Router();
const { sendOtp, verifyOtpAndLogin, registerCompanyAndLogin } = require('../controllers/auth.controller');

router.post('/send-otp', sendOtp);
router.post('/verify-otp-and-login', verifyOtpAndLogin);
router.post('/register-company-and-login', registerCompanyAndLogin);
module.exports = router;
