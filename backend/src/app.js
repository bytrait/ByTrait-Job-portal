const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
// Middlewares
app.use(cors(
  {
    origin: 'http://127.0.0.1:5173', 
    credentials: true, 
  }
));
app.use(cookieParser());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/company', require('./routes/company.routes'));
app.use("/api/jobs", require("./routes/job.routes"));
app.use("/api/industries", require("./routes/industry.routes"));
app.use('/api/job-applications', require('./routes/jobApplication.routes'));
app.use('/api/campus-jobs', require('./routes/campushJob.routes'));
app.get('/', (req, res) => {
  res.send('Job Portal Backend Running');
});

module.exports = app;
