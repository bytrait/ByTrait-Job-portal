require('dotenv').config();
const app = require('./app');
const { connectDB, sequelize } = require('./config/db');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  // Use alter:true to keep schema in sync without migrations
  await sequelize.sync({ force: true });

  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
