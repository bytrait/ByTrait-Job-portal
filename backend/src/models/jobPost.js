const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
    
    const JobPost = sequelize.define('job_scraped_posts', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: DataTypes.STRING,
      company: DataTypes.STRING,
      location: DataTypes.STRING,
      link: { type: DataTypes.STRING, unique: true },
      posted_date: DataTypes.DATE,
      scraped_at: DataTypes.DATE
    }, {
      timestamps: false,
      tableName: 'job_scraped_posts'
    });
  

module.exports = JobPost;