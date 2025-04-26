const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Job = sequelize.define("Job", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    applyLink: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    skills: {
        type: DataTypes.ARRAY(DataTypes.STRING), // e.g., ['Java', 'Spring Boot']
        allowNull: false,
    },
    jobType: {
        type: DataTypes.STRING,
        allowNull: false, // e.g., 'Full-time', 'Internship'
    },
    industryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    qualification: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    minSalary: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    maxSalary: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    companyId: {
      type: DataTypes.UUID,
        allowNull: false,
    },
}, {
    tableName: 'jobs',
    timestamps: true,
});

module.exports = Job;