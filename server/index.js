const express = require("express");
const cors = require("cors");
const { eq, and } = require("drizzle-orm");
require("dotenv").config();

const { db } = require("./db");
const { classes } = require("./db/schema");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware: allow requests from React and parse JSON request bodies
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Health check: verify that the Express server is running
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "REDLINE Fitness API is running",
  });
});

// GET /api/classes: retrieve fitness classes from Neon PostgreSQL
app.get("/api/classes", async (req, res) => {
  try {
    // Read optional filters from the URL query parameters
    const { day, intensity } = req.query;
    const conditions = [];

    // Filter by day (MON or TUE) when provided
    if (day) {
      conditions.push(eq(classes.day, day.toUpperCase()));
    }

    // Filter by intensity unless ALL is selected
    if (intensity && intensity.toUpperCase() !== "ALL") {
      conditions.push(eq(classes.intensity, intensity.toUpperCase()));
    }

    // Query the database and return classes ordered by ID
    const result = await db
      .select()
      .from(classes)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(classes.id);

    res.json(result);
  } catch (error) {
    // Return an HTTP 500 response if the database query fails
    console.error("Failed to fetch classes:", error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
