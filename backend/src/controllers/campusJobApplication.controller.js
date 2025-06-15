// controllers/campusJobApplicationController.js

const { CampusJobApplication, CampusJob } = require('../models');
const axios = require('axios');

exports.applyToCampusJob = async (req, res) => {
  try {
    const studentId = req.user.userId;
    const schoolId = req.user.schoolId;
    const { jobId } = req.params;

    // Validate if job exists
    const job = await CampusJob.findOne({ where: { id: jobId, school_id: schoolId } });
    if (!job) return res.status(404).json({ message: 'Job not found' });

    // Check if already applied
    const alreadyApplied = await CampusJobApplication.findOne({
      where: { student_id: studentId, job_id: jobId }
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied to this job' });
    }

    // Create application
    const application = await CampusJobApplication.create({
      student_id: studentId,
      job_id: jobId,
      school_id: schoolId
    });

    res.status(201).json({ message: 'Applied successfully', application });
  } catch (err) {
    console.error('Application Error:', err);
    res.status(500).json({ message: 'Failed to apply for job' });
  }
};

exports.getCampusApplicationsWithStudentData = async (req, res) => {
  const jobId = req.params.jobId;
  console.log("Fetching applications for jobId:", jobId);
  try {
    // 1. Fetch applications for the given jobId
    const applications = await CampusJobApplication.findAll({
      where: { job_id: jobId },
      attributes: ["id", "student_id", "job_id", "applied_at"],
    });

    if (applications.length === 0) {
      return res.status(404).json({ message: "No applications found" });
    }

    // 2. Extract unique student IDs
    const studentIds = applications.map(app => app.student_id);

    // 3. Call external student API to get student data
    const studentRes = await axios.get(`${process.env.MYPROFILE_BASE_URL}/users`, {
      params: { ids: studentIds.join(",") },
    });

    const students = studentRes.data;
    // 4. Merge each application with corresponding student data
    const result = applications.map(app => {
      const student = students.find(s => s.user_id === app.student_id);
      return {
        applicationId: app.id,
        jobId: app.job_id,
        studentId: app.student_id,
        appliedAt: app.applied_at,
        name: student?.name,
        education: student?.course,
        location: student?.location,
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching campus applications with student data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
