const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Test API route
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "REDLINE Fitness API is running",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
