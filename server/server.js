const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const questionRoutes = require('./routes/questionRoutes');

// Load environment variables from .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow all origins for dev/hackathon
app.use(express.json());

// Routes
app.use('/api', questionRoutes);

// Root route for quick verification
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: "AI Question Paper Backend API is online. Use /api/health or /api/generate-paper",
    endpoints: {
      health: "/api/health",
      generatePaper: "/api/generate-paper"
    }
  });
});

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`===========================================`);
    console.log(`🚀 AI Question Paper API Server`);
    console.log(`📡 Listening on: http://localhost:${PORT}`);
    console.log(`🩺 Health check: http://localhost:${PORT}/api/health`);
    console.log(`📝 Paper API:   http://localhost:${PORT}/api/generate-paper`);
    console.log(`===========================================`);
  });
}

module.exports = app;
