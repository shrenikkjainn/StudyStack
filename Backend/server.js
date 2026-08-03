require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');

// Added handlers for uncaught exceptions and unhandled rejections to prevent server crashes
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Express server is live on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error.message);
    process.exit(1);
  }
};

startServer();
