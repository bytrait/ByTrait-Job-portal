const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
// Middlewares
app.use(cors(
  {
    origin: 'https://myjobposts.bytrait.com', 
    credentials: true, 
  }
));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/company', require('./routes/company.routes'));
app.use("/api/jobs", require("./routes/job.routes"));
app.use("/api/industry", require("./routes/industry.routes"));
app.use('/api/job-applications', require('./routes/jobApplication.routes'));
app.use('/api/campus-jobs', require('./routes/campushJob.routes'));
app.use('/api/job-scraped', require('./routes/jobScraped.routes'));
app.use('/api/campus-job-applications', require('./routes/campusJobApplication.routes'));
app.use('/api/skills', require('./routes/scraperSkill.routes'));

module.exports = app;
