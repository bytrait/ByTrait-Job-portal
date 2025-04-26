const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/company', require('./routes/company.routes'));
app.get('/', (req, res) => {
  res.send('Job Portal Backend Running');
});

module.exports = app;
