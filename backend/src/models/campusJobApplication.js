// models/CampusJobApplication.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CampusJobApplication = sequelize.define('CampusJobApplication', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    school_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('applied', 'reviewed', 'shortlisted', 'rejected', 'selected'),
        defaultValue: 'applied',
    },
    applied_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'campus_job_applications',
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['student_id', 'job_id'], // prevent duplicate entries
        },
    ],
});

module.exports = CampusJobApplication;
