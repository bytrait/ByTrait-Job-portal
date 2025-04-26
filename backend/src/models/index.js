const OTP = require("./otp");
const Company = require("./company");
const Job = require("./job");
const Industry = require("./Industry");

Company.hasMany(Job, { foreignKey: 'companyId' });
Job.belongsTo(Company, { foreignKey: 'companyId' });

Industry.hasMany(Job, { foreignKey: 'industryId' });
Job.belongsTo(Industry, { foreignKey: 'industryId' });


module.exports = {
  Industry,
  Job,
  Company,
  OTP,
};
