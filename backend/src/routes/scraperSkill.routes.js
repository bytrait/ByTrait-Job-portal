const express = require('express');
const router = express.Router();
const {
  getAllSkills,
  addSkill,
  deleteSkill,
} = require('../controllers/scraperSkill.controller');
const verifyStudentTokenFromCookie = require('../middleware/student.middleware');

router.get('/', verifyStudentTokenFromCookie,getAllSkills);
router.post('/', verifyStudentTokenFromCookie,addSkill);
router.delete('/:id', verifyStudentTokenFromCookie,deleteSkill);

module.exports = router;
