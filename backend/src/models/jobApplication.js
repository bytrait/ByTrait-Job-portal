const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const JobApplication = sequelize.define('JobApplication', {
    jobId: {
        type: DataTypes.UUID,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isCustomResume: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    resumeLink: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'job_applications',
    timestamps: true
});

module.exports = JobApplication;
