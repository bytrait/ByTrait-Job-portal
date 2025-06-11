const { CampusJob, CampusJobApplication } = require("../models");


const applyToCampusJob = async (req, res) => {
  try {
    const jobId = parseInt(req.params.jobId);
    const { student_id, school_id } = req.user; // from JWT middleware

    if (!jobId || !student_id || !school_id) {
      logger.warn("Missing jobId, student_id, or school_id from request.");
      return res.status(400).json({ message: "Invalid request data" });
    }

    const job = await CampusJob.findByPk(jobId);

    if (!job) {
      logger.warn(`CampusJob not found for id ${jobId}`);
      return res.status(404).json({ message: "Campus job not found" });
    }

    if (job.school_id !== school_id) {
      logger.warn(`Student from another school tried to apply: student=${student_id}, job_school=${job.school_id}, student_school=${school_id}`);
      return res.status(403).json({ message: "Unauthorized to apply for this job" });
    }

    // Check if already applied
    const existing = await CampusJobApplication.findOne({
      where: { student_id, job_id: jobId }
    });

    if (existing) {
      logger.info(`Duplicate apply attempt by student ${student_id} for job ${jobId}`);
      return res.status(200).json({ message: "Already applied" });
    }

    // Create application entry
    await CampusJobApplication.create({
      student_id,
      job_id: jobId,
      school_id,
      status: "applied"
    });

    logger.info(`Student ${student_id} applied to job ${jobId}`);
    return res.status(201).json({ message: "Application logged. Redirect to application link.", applyLink: job.applyLink });

  } catch (error) {
    logger.error("Error in applyToCampusJob:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = {
  applyToCampusJob,
};
