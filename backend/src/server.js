require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

// Config comes from .env; the values below are fallbacks (local MongoDB, port 5000).
const { MONGODB_URI = 'mongodb://localhost:27017/todos', PORT = 5000 } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
