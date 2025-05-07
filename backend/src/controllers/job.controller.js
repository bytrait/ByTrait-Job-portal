const { Op } = require("sequelize");
const { Job, Industry, Company } = require("../models");
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
        { model: Industry, as: 'Industry' },
        // { model: Company, as: 'Company' }
      ]
    });
    logger.info("Jobs fetched successfully for company ID:", companyId);
    if (!jobs || jobs.length === 0) {
      logger.info("No jobs found for company ID:", companyId);
      return res.status(404).json({ message: "No jobs found" });
    }
    logger.info("Jobs fetched successfully for company ID:", companyId);


    res.status(200).json(jobs);
  } catch (error) {
    logger.error("Error fetching jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.filterJobs = async (req, res) => {
  try {
    const { title, skills, jobType, industryId, location } = req.query;

    const filters = {};

    if (skills) filters.skills = { [Op.contains]: skills.split(",") };
    if (jobType) filters.jobType = jobType;
    if (industryId) filters.industryId = industryId;
    if (location) filters.location = { [Op.iLike]: `%${location}%` };
  

    logger.info("Filtering jobs with criteria:", filters);

    const jobs = await Job.findAll({
      where: filters,
      include: [
        { model: Industry, attributes: ["name"], as: 'Industry' },
        { model: Company, attributes: ["companyName", "website"] , as: 'Company' }
      ]
    });

    if (!jobs || jobs.length === 0) {
      logger.info("No jobs found with the given filters");
      return res.status(404).json({ message: "No jobs found" });
    }

    logger.info("Jobs filtered successfully");
    res.status(200).json(jobs);
  } catch (error) {
    logger.error("Error filtering jobs:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};