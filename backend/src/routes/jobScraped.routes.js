const express = require('express');
const router = express.Router();
const jobScrapedController = require('../controllers/jobScraped.controller');

router.get('/', jobScrapedController.getScrapedJobs);

module.exports = router;
