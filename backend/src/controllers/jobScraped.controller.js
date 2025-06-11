const { JobPost } = require("../models");
const logger = require("../utils/logger");

exports.getScrapedJobs = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query; // Default to page 1 and limit 20
        const offset = (page - 1) * limit;

        logger.info(`Fetching scraped jobs for page ${page} with limit ${limit}...`);
        
        const { count, rows: jobs } = await JobPost.findAndCountAll({
            order: [['scraped_at', 'DESC']],
            limit: parseInt(limit),
            offset: parseInt(offset)
        });

        const totalPages = Math.ceil(count / limit);

        logger.info(`Successfully fetched ${jobs.length} scraped jobs for page ${page}. Total pages: ${totalPages}`);
        res.json({ jobs, totalPages });
    } catch (error) {
        logger.error('Error fetching scraped jobs:', error);
        res.status(500).json({ error: 'Failed to fetch scraped jobs' });
    }
};
