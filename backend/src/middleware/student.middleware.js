const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyStudentTokenFromCookie = (req, res, next) => {
  const token = req.cookies["user-details"];
  if (!token) {
    return res.status(401).json({ message: 'Student not logged in' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.user = decoded.user; // contains { id, email }
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired student token' });
  }
};

module.exports = verifyStudentTokenFromCookie;
