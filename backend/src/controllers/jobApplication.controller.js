const { JobApplication, Job, Company } = require('../models');
const logger = require("../utils/logger");
const axios = require('axios');

const applyToJob = async (req, res) => {
  try {
    const { jobId, isCustomResume, resumeLink } = req.body;
    const userId = req.user.userId; 

    if (isCustomResume && !resumeLink) {
      logger.error("Custom resume link is required when isCustomResume is true");
      return res.status(400).json({ message: 'Custom resume link is required.' });
    }

    const existingApplication = await JobApplication.findOne({
      where: { userId, jobId }
    });

    if (existingApplication) {
      logger.error("User has already applied to this job");
      return res.status(400).json({ message: 'You have already applied to this job.' });
    }
    logger.info("Creating job application with data:", {
      jobId,
      userId,
      isCustomResume,
      resumeLink
    });
    const application = await JobApplication.create({
      jobId,
      userId,
      isCustomResume,
      resumeLink: isCustomResume ? resumeLink : null
    });
    logger.info("Job application created successfully:", application);
    res.status(201).json({ message: 'Application submitted successfully.', application });
  } catch (err) {
    logger.error("Error applying to job:", err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      logger.error("User ID not found in request");
      return res.status(401).json({ message: 'Unauthorized' });
    }
    logger.info("Fetching applications for user ID:", userId);
    const applications = await JobApplication.findAll({
      where: { userId },
      include: {
        model: Job,
        as: 'Job',
        include: {
          model: Company,
          as: 'Company',
          attributes: ['name', 'logo', 'website']
        }
      }
    });
    if (!applications || applications.length === 0) {
      logger.info("No applications found for user ID:", userId);
      return res.status(404).json({ message: 'No applications found.' });
    }
    logger.info("Applications fetched successfully for user ID:", userId);
    res.status(200).json(applications);
  } catch (err) {
    logger.error("Error fetching applications:", err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getApplicationsByJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    if (!jobId) {
      logger.error("Job ID not found in request");
      return res.status(400).json({ message: 'Job ID is required.' });
    }
    logger.info("Fetching applications for job ID:", jobId);
    const applications = await JobApplication.findAll({
      where: { jobId },
      include: {
        model: Job,
        as: 'Job'
      }
    });
    if (!applications || applications.length === 0) {
      logger.info("No applications found for job ID:", jobId);
      return res.status(404).json({ message: 'No applications found.' });
    }
    logger.info("Applications fetched successfully for job ID:", jobId);

    res.status(200).json(applications);
  } catch (err) {
    logger.error("Error fetching applications by job:", err);
    res.status(500).json({ message: 'Server error.' });
  }
};

const getApplicationsWithUserData = async (req, res) => {
  const jobId  = req.query.jobId;
  console.log(req.query)

  try {
    // 1. Get job applications from your DB
    const applications = await JobApplication.findAll({
      where: { jobId },
      attributes: ["id", "userId", "jobId","isCustomResume","resumeLink"],
    });

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    // 2. Extract userIds
    const userIds = applications.map(app => app.userId);

    // 3. Fetch user data from external API
    const userRes = await axios.get(`${process.env.MYPROFILE_BASE_URL}/users`, {
      params: { ids: userIds.join(",") },
    });

    const users = userRes.data;

    // 4. Merge application with user data
    const responseData = applications.map(app => {
      const user = users.find(u => u.user_id === app.userId);
      return {
        applicationId: app.id,
        jobId: app.jobId,
        userId: app.userId,
        name: user?.name,
        education: user?.course,
        location: user?.location,
        resumeLink: app.resumeLink,
        isCustomResume: app.isCustomResume,
      };
    });

    res.status(200).json(responseData);
  } catch (error) {
    console.error("Error fetching applications with user data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};


const checkIfApplied = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user.userId;

    if (!jobId) {
      logger.error("Job ID not found in request");
      return res.status(400).json({ message: 'Job ID is required.' });
    }

    logger.info("Checking if user has applied for job ID:", jobId);
    const existingApplication = await JobApplication.findOne({
      where: { userId, jobId }
    });

    if (existingApplication) {
      logger.info("User has already applied for job ID:", jobId);
      return res.status(200).json({ applied: true });
    }

    logger.info("User has not applied for job ID:", jobId);
    res.status(200).json({ applied: false });
  } catch (err) {
    logger.error("Error checking if job is applied:", err);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = {
  applyToJob,
  getMyApplications,
  getApplicationsByJob,
  checkIfApplied,
  getApplicationsWithUserData
};
