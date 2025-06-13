const { Company, OTP } = require('../models');
const generateOTP = require('../utils/otp.util');
const sendOTPEmail = require('../utils/mail.util');
const generateToken = require('../utils/jwt.util');
const logger = require('../utils/logger');
const verifyOTP = require('../utils/varifyOTP');
const jwt = require('jsonwebtoken');

const sendOtpForRegistration = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    logger.error('Email are required');
    return res.status(400).json({ message: 'Email are required' })
  };

  const otp = generateOTP();
  if (!otp) {
    logger.error('Failed to generate OTP');
    return res.status(500).json({ message: 'Failed to generate OTP' });
  }
  const expiresAt = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES || 5) * 60000));
  logger.info(`Generated OTP: ${otp} for email: ${email}`);
  await OTP.create({ email, otp, expiresAt });
  await sendOTPEmail(email, otp);
  logger.info(`Sent OTP to email: ${email}`);
  return res.status(200).json({ message: 'OTP sent to email' });
};

const sendOtpForLogin = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    logger.error('Email is required');
    return res.status(400).json({ message: 'Email is required' });
  }

  const company = await Company.findOne({ where: { email } });
  if (!company) {
    logger.error('Company not found');
    return res.status(404).json({ message: 'Company not found' });
  }

  const otp = generateOTP();
  if (!otp) {
    logger.error('Failed to generate OTP');
    return res.status(500).json({ message: 'Failed to generate OTP' });
  }
  const expiresAt = new Date(Date.now() + (parseInt(process.env.OTP_EXPIRY_MINUTES || 5) * 60000));
  logger.info(`Generated OTP: ${otp} for email: ${email}`);
  await OTP.create({ email, otp, expiresAt });
  await sendOTPEmail(email, otp);
  logger.info(`Sent OTP to email: ${email}`);
  return res.status(200).json({ message: 'OTP sent to email' });
}

const verifyOtpAndLogin = async (req, res) => {
  const { email, otp } = req.body;
  try {
    if (!email || !otp) {
      logger.error('Email and OTP are required');
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    if (verifyOTP(email, otp)) {
      const company = await Company.findOne({ where: { email } });
      if (!company) {
        logger.error('Company not found');
        return res.status(404).json({ message: 'Company not found' });
      }
      const token = generateToken({ id: company.id, companyName: company.companyName, email: company.email });
      logger.info(`Generated token for company: ${company.companyName}`);
      return res.status(200).json({ token });
    }
    logger.error('Invalid OTP');
    return res.status(400).json({ message: 'Invalid OTP' });
  } catch (error) {
    logger.error('Error verifying OTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const registerCompanyAndLogin = async (req, res) => {
  const { companyName, email, otp } = req.body;
  if (!companyName || !email || !otp) {
    logger.error('Company name, email and OTP are required');
    return res.status(400).json({ message: 'Company name, email and OTP are required' });
  }
  const company = await Company.findOne({ where: { email } });
  if (company) {
    logger.error('Email already exists');
    return res.status(400).json({ message: 'Email already exists' });
  }
  const isValidOtp = await verifyOTP(email, otp);
  if (!isValidOtp) {
    logger.error('Invalid OTP');
    return res.status(400).json({ message: 'Invalid OTP' });
  }



  const newCompany = await Company.create({ companyName, email });
  if (!newCompany) {
    logger.error('Failed to create company');
    return res.status(500).json({ message: 'Failed to create company' });
  }
  const token = generateToken({ id: newCompany.id, companyName: newCompany.companyName, email: newCompany.email });
  logger.info(`Generated token for new company: ${newCompany.companyName}`);
  return res.status(201).json({ token, isProfileComplete: newCompany.isProfileComplete });

}

const getUserInfo = async (req, res) => {
  try {
    const { userId, isCounsellor } = req.user;

    if (!userId) {
      logger.error('User information is incomplete');
      return res.status(400).json({ message: 'User information is incomplete' });
    }

    let role = 'student'; // Default

    const adminIds = process.env.ADMIN_USER_IDS?.split(',') || [];
    if (adminIds.includes(userId.toString())) {
      role = 'admin';
    } else if (isCounsellor === '1') {
      role = 'TPO';
    }
    console.log(role)
    logger.info(`Fetched user info for userId: ${userId}, role: ${role}`);
    res.json({ userId, role });

  } catch (error) {
    logger.error('Error fetching user info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const getCompanyInfo = async (req, res) => {
  try {
    const { id, companyName,email } = req.company;
    logger.info(`Fetched company info for companyId: ${id}`);
    res.json({ id, companyName, email, role: 'company' });
  } catch (error) {
    logger.error('Error fetching company info:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
  sendOtpForRegistration,
  sendOtpForLogin,
  verifyOtpAndLogin,
  registerCompanyAndLogin,
  getUserInfo,
  getCompanyInfo
};
