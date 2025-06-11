const Company = require("./company");
const OTP = require("./otp");
const Job = require("./job");
const Industry = require("./Industry");
const JobApplication = require("./jobApplication");
const CampusJob = require("./campusJob");
const CampusJobApplication = require("./campusJobApplication"); // <-- add this
const JobPost = require("./jobPost");
// Company ↔ Job
Company.hasMany(Job, { foreignKey: 'companyId', as: 'jobs' });
Job.belongsTo(Company, { foreignKey: 'companyId', as: 'Company' });

// Industry ↔ Job
Industry.hasMany(Job, { foreignKey: 'industryId', as: 'jobs' });
Job.belongsTo(Industry, { foreignKey: 'industryId', as: 'Industry' });

// Job ↔ JobApplication
Job.hasMany(JobApplication, { foreignKey: 'jobId', as: 'applications' });
JobApplication.belongsTo(Job, { foreignKey: 'jobId', as: 'Job' });

// CampusJob ↔ CampusJobApplication
CampusJob.hasMany(CampusJobApplication, { foreignKey: 'job_id', as: 'applications' });
CampusJobApplication.belongsTo(CampusJob, { foreignKey: 'job_id', as: 'job' });

module.exports = {
  Industry,
  Job,
  Company,
  OTP,
  JobApplication,
  CampusJob,
  CampusJobApplication,
  JobPost
};
