const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.DATABASE) {
    throw new Error('DATABASE environment variable is missing');
  }

  await mongoose.connect(process.env.DATABASE);
  console.log('Database connection established');
};

module.exports = connectDB;
