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
        return res.status(401).json({ message: "Unauthorized" })}
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
