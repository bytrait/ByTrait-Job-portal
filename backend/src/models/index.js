const Company = require("./company");
const OTP = require("./otp");
const Job = require("./job");
const Industry = require("./Industry");

Company.hasMany(Job, { foreignKey: 'companyId', as: 'jobs' });
Job.belongsTo(Company, { foreignKey: 'companyId', as: 'Company' });

Industry.hasMany(Job, { foreignKey: 'industryId', as: 'jobs' });
Job.belongsTo(Industry, { foreignKey: 'industryId', as: 'Industry' });



module.exports = {
  Industry,
  Job,
  Company,
  OTP,
};
