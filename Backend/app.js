const express = require('express');
const cors = require('cors'); // Added for CORS support
const courseRoutes = require('./routes/courseRoutes');
const authRoutes = require('./routes/authRoutes');
// const chatRoutes = require('./routes/chatRoutes');

const logger = require('./middlewares/logger');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Configured CORS to allow all origins for now, since there is no frontend deployed yet
app.use(cors());

app.use(express.json());
app.use(logger);

// Added health check endpoint for production deployment
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'StudyStack Backend Running'
  });
});

app.get('/', (req, res) => {
  res.send('Welcome to the StudyStack API');
});

app.use('/api/courses', courseRoutes);
app.use('/', authRoutes);
// app.use('/api', chatRoutes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;