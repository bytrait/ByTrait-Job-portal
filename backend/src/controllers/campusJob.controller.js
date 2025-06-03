const app = require('../app');
const { CampusJob } = require('../models');
const logger = require('../utils/logger'); // Assuming you have a logger utility

exports.createCampusJob = async (req, res) => {
    try {
        const { title, description,applyLink, location, salary, skills, qualification, job_type, deadline, companyName } = req.body;
        const tpoId = req.user.userId;         // From JWT
        const schoolId = req.user.schoolId;

        if(req.user.isCounsellor !== '1'){
            logger.warn('Unauthorized access attempt to create campus job', { userId: tpoId });
            return res.status(403).json({ message: 'Forbidden: Only TPOs can create campus jobs' });
        }

        logger.info('Received request to create campus job', { tpoId, schoolId, title, companyName });

        if (!title || !companyName) {
            logger.warn('Validation failed: Title and company name are required');
            return res.status(400).json({ message: 'Title and company name are required' });
        }

        const newJob = await CampusJob.create({
            title,
            description,
            applyLink,
            location,
            salary,
            skills, // assuming array
            qualification,
            job_type,
            deadline,
            company_name : companyName,
            created_by: tpoId,
            school_id: schoolId,
        });

        logger.info('Campus job created successfully', { jobId: newJob.id });
        res.status(201).json({ message: 'Campus job posted successfully', job: newJob });
    } catch (error) {
        logger.error('Error creating campus job', { error: error.message });
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCampusJobs = async (req, res) => {
    const schoolId = req.user.schoolId;
    const jobs = await CampusJob.findAll({ where: { school_id: schoolId } });
    res.json(jobs);
};