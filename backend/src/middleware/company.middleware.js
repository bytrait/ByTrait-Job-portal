const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyCompanyTokenFromHeader = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Company token missing' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.company = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired company token' });
  }
};

module.exports = verifyCompanyTokenFromHeader;
