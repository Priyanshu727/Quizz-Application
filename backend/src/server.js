const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../config/db');
const quizRoutes = require('../routes/quizRoutes');
const { errorHandler } = require('../middlewares/errorHandler');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Use CORS middleware
app.use(cors());

// MongoDB connection
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Quiz routes
app.use('/api/quizzes', quizRoutes);

// Error handling middleware
app.use(errorHandler);

// Define the port
const PORT = process.env.PORT || 8084;

// Start the server
app.listen(PORT, (err) => {
    if (err) {
        console.log(err, "Server did not start");
    } else {
        console.log(`Listening on port: http://localhost:${PORT}`);
    }
});
