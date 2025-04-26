const { Company, OTP } = require('../models');
const generateOTP = require('../utils/otp.util');
const sendOTPEmail = require('../utils/mail.util');
const generateToken = require('../utils/jwt.util');
const logger = require('../utils/logger');

const sendOtp = async (req, res) => {
  const { email, companyName } = req.body;
  if (!email || !companyName) {
    logger.error('Email and company name are required');
    return res.status(400).json({ message: 'Email and company name are required' })};

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
  let company = await Company.findOne({ where: { email } });
  if (!company) {
    logger.info(`Company not found, creating new entry for email: ${email}`);
    await Company.create({ email, companyName });
    logger.info(`New company created for email: ${email}`);
  }

  return res.status(200).json({ message: 'OTP sent to email' });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp){ 
    logger.error('Email and OTP are required');
    return res.status(400).json({ message: 'Email and OTP are required' });}

  const validOtp = await OTP.findOne({ where: { email, otp } });
  if (!validOtp || validOtp.expiresAt < new Date()) {
    logger.error('Invalid or expired OTP');
    return res.status(401).json({ message: 'Invalid or expired OTP' });
  }
  logger.info(`OTP verified for email: ${email}`);
  await OTP.destroy({ where: { email } }); // clear OTPs after use
  logger.info(`OTP cleared for email: ${email}`);
  const company = await Company.findOne({ where: { email } });
  if (!company) {
    logger.error('Company not found');
    return res.status(404).json({ message: 'Company not found' });
  }
  logger.info(`Company found for email: ${email}`);
  const token = generateToken({ id: company.id, email });
  if (!token) {
    logger.error('Failed to generate token');
    return res.status(500).json({ message: 'Failed to generate token' });
  }
  logger.info(`Token generated for email: ${email}`);
  return res.status(200).json({ token, company });
};

module.exports = {
  sendOtp,
  verifyOtp,
};
