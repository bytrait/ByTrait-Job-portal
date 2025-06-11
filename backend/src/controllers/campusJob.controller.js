const app = require('../app');
const { CampusJob } = require('../models');
const logger = require('../utils/logger'); // Assuming you have a logger utility

exports.createCampusJob = async (req, res) => {
    try {
        const { title, description,applyLink, location, salary, skills, qualification, jobType, deadline, companyName } = req.body;
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
            job_type:jobType,
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
    try {
        const schoolId = req.user.schoolId;

        logger.info('Received request to fetch campus jobs', { schoolId });

        const jobs = await CampusJob.findAll({ where: { school_id: schoolId } });

        if (jobs.length === 0) {
            logger.warn('No campus jobs found for the given school', { schoolId });
            return res.status(404).json({ message: 'No campus jobs found' });
        }

        logger.info('Campus jobs fetched successfully', { schoolId, jobCount: jobs.length });
        res.json(jobs);
    } catch (error) {
        logger.error('Error fetching campus jobs', { error: error.message });
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getCampusJobById = async (req, res) => {
    try {
        const { id } = req.params;
        const schoolId = req.user.schoolId;

        logger.info('Received request to fetch campus job by ID', { jobId: id, schoolId });

        const job = await CampusJob.findOne({ where: { id, school_id: schoolId } });

        if (!job) {
            logger.warn('Campus job not found', { jobId: id, schoolId });
            return res.status(404).json({ message: 'Campus job not found' });
        }

        logger.info('Campus job fetched successfully', { jobId: id });
        res.json(job);
    } catch (error) {
        logger.error('Error fetching campus job by ID', { error: error.message });
        res.status(500).json({ message: 'Internal server error' });
    }
};

