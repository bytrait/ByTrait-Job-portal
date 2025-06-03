const { Op } = require("sequelize");
const { Job, Industry, Company, JobApplication } = require("../models");
const logger = require("../utils/logger");

exports.createJob = async (req, res) => {
  try {
    const {
      title,
      applyLink,
      skills,
      jobType,
      industryId,
      qualification,
      location,
      minSalary,
      maxSalary,
      description
    } = req.body;

    const companyId = req.company.id;

    if (!companyId) {
      logger.error("Company ID not found in request");
      return res.status(401).json({ message: "Unauthorized" })
    }
    if (!title || !skills || !jobType || !industryId || !qualification || !location || !description) {
      logger.error("Missing required fields");
      return res.status(400).json({ message: "All fields are required" });
    }

    logger.info("Creating job with data:", {
      title,
      applyLink,
      skills,
      jobType,
      industryId,
      qualification,
      location,
      minSalary,
      maxSalary,
      description
    });

    const newJob = await Job.create({
      title,
      applyLink,
      skills,
      jobType,
      industryId,
      qualification,
      location,
      minSalary,
      maxSalary,
      description,
      companyId
    });
    logger.info("Job created successfully:", newJob);

    res.status(201).json({ message: "Job posted successfully", job: newJob });
  } catch (error) {
    logger.error("Error creating job:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll({
      include: [
        { model: Industry, attributes: ["name"] },
        { model: Company, attributes: ["name", "website"] }
      ]
    });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getalljobsbycompany = async (req, res) => {
  try {
    const companyId = req.company.id;
    console.log("Company ID:", companyId);
    
    if (!companyId) {
      logger.error("Company ID not found in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    logger.info("Fetching jobs for company ID:", companyId);

    const jobs = await Job.findAll({
      where: { companyId },
      include: [
        { model: Industry, as: 'Industry' }, // Include Industry details
        {
          model: JobApplication,
          as: 'applications', // This alias must match your association
          attributes: ['id']  // Only get job application ID to save data
        }
      ]
    });

    if (!jobs || jobs.length === 0) {
      logger.info("No jobs found for company ID:", companyId);
      return res.status(404).json({ message: "No jobs found" });
    }

    // Add job application count to each job
    const jobsWithApplicationCount = jobs.map(job => ({
      ...job.toJSON(),
      applicationCount: job.applications ? job.applications.length : 0
    }));

    logger.info("Jobs fetched successfully for company ID:", companyId);
    res.status(200).json(jobsWithApplicationCount);

  } catch (error) {
    logger.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.filterJobs = async (req, res) => {
  try {
    const {
      skills,
      location,
      dateFilter,
      page = 1,
      limit = 20
    } = req.query;

    const filters = {};

    // Skills filter
    if (skills) {
      const skillsArray = skills.split(/[\s,]+/).filter(Boolean);
      filters.skills = { [Op.overlap]: skillsArray };
    }

    let jobType = req.query.jobType || req.query['jobType[]'];
    if (typeof jobType === 'string') {
      jobType = jobType.split(',');
    }
    if (jobType) {
      filters.jobType = { [Op.in]: jobType };
    }



    // Multiple industries

    let industryIds = req.query.industryIds || req.query['industryIds[]'];
    if (typeof industryIds === 'string') {
      industryIds = industryIds.split(',').map(id => parseInt(id, 10));
    } else if (Array.isArray(industryIds)) {
      industryIds = industryIds.map(id => parseInt(id, 10));
    }
    if (industryIds) {
      filters.industryId = { [Op.in]: industryIds };
    }

    // Location filter
    if (location) {
      filters.location = { [Op.iLike]: `%${location}%` };
    }

    // Date filter
    if (dateFilter && dateFilter !== 'all') {
      const now = new Date();
      const daysMap = { '24h': 1, '3d': 3, '7d': 7, '30d': 30 };
      const days = daysMap[dateFilter];
      if (days) {
        const fromDate = new Date(now.setDate(now.getDate() - days));
        filters.createdAt = { [Op.gte]: fromDate };
      }
    }

    const offset = (parseInt(page) - 1) * parseInt(limit);

    const jobs = await Job.findAndCountAll({
      where: filters,
      include: [
        { model: Industry, attributes: ['name'], as: 'Industry' },
        { model: Company, attributes: ['companyName', 'website', 'imageUrl'], as: 'Company' }
      ],
      limit: parseInt(limit),
      offset,
      order: [['createdAt', 'DESC']],
    });

    if (jobs.count === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }

    res.status(200).json({
      totalJobs: jobs.count,
      totalPages: Math.ceil(jobs.count / limit),
      currentPage: parseInt(page),
      jobs: jobs.rows
    });

  } catch (error) {
    console.error("Error filtering jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getJobById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      logger.error("Job ID not provided in request");
      return res.status(400).json({ message: "Job ID is required" });
    }

    logger.info("Fetching job with ID:", id);

    const job = await Job.findOne({
      where: { id },
      include: [
        { model: Industry, attributes: ["name"], as: "Industry" },
        { model: Company, attributes: ["companyName", "website", "imageUrl"], as: "Company" }
      ]
    });

    if (!job) {
      logger.info("No job found with ID:", id);
      return res.status(404).json({ message: "Job not found" });
    }

    // Check if the user has already applied for this job
    const userId = req.user.userId; 
    const alreadyApplied = await JobApplication.findOne({
      where: { jobId: id, userId }
    });

    logger.info("Job fetched successfully with ID:", id);
    res.status(200).json({
      ...job.toJSON(),
      alreadyApplied: !!alreadyApplied
    });
  } catch (error) {
    logger.error("Error fetching job by ID:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


exports.getMyAppliedJobs = async (req, res) => {
  try {
    const userId = req.user.userId; 

    if (!userId) {
      logger.error("User ID not found in request");
      return res.status(401).json({ message: "Unauthorized" });
    }

    logger.info("Fetching applied jobs for user ID:", userId);

    const appliedJobs = await JobApplication.findAll({
      where: { userId },
      include: [
        {
          model: Job,
          as: "Job",
          include: [
            { model: Industry, attributes: ["name"], as: "Industry" },
            { model: Company, attributes: ["companyName", "website", "imageUrl"], as: "Company" }
          ]
        }
      ]
    });

    if (!appliedJobs || appliedJobs.length === 0) {
      logger.info("No applied jobs found for user ID:", userId);
      return res.status(404).json({ message: "No applied jobs found" });
    }

    logger.info("Applied jobs fetched successfully for user ID:", userId);
    res.status(200).json(appliedJobs);
  } catch (error) {
    logger.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};