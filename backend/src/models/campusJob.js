const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const CampusJob = sequelize.define('CampusJob', {
    id: { 
        type: DataTypes.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    },
    title: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    applyLink: {
        type: DataTypes.STRING, 
        allowNull: true 
    },
    description: { 
        type: DataTypes.TEXT 
    },
    location: { 
        type: DataTypes.STRING 
    },

    salary: { 
        type: DataTypes.STRING 
    },
    skills: { 
        type: DataTypes.ARRAY(DataTypes.STRING) 
    },
    qualification: { 
        type: DataTypes.STRING 
    },
    job_type: { 
        type: DataTypes.STRING 
    }, // e.g., full-time, internship

    deadline: { 
        type: DataTypes.DATE 
    },
    company_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    created_by: { 
        type: DataTypes.INTEGER, 
        allowNull: false }, // TPO ID
    school_id: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    }, // From JWT
}, {
    tableName: 'campus_jobs',
});

module.exports = CampusJob;