const Company = require("./company");
const OTP = require("./otp");
const Job = require("./job");
const Industry = require("./Industry");
const JobApplication = require("./jobApplication");
const CampusJob = require("./campusJob");

Company.hasMany(Job, { foreignKey: 'companyId', as: 'jobs' });
Job.belongsTo(Company, { foreignKey: 'companyId', as: 'Company' });

Industry.hasMany(Job, { foreignKey: 'industryId', as: 'jobs' });
Job.belongsTo(Industry, { foreignKey: 'industryId', as: 'Industry' });

Job.hasMany(JobApplication, { foreignKey: 'jobId', as: 'applications' });
JobApplication.belongsTo(Job, { foreignKey: 'jobId', as: 'Job' });

module.exports = {
  Industry,
  Job,
  Company,
  OTP,
  JobApplication,
  CampusJob
};
