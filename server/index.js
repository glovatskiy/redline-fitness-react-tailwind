const express = require("express");
const cors = require("cors");
const { eq, and } = require("drizzle-orm");
require("dotenv").config();

// Database connection and schema
const { db } = require("./db");
const { classes } = require("./db/schema");

// PostgreSQL-backed authentication sessions
const sessionMiddleware = require("./db/session");

// Authentication routes (signup, login, logout)
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware: allow requests from the React frontend
// credentials: true allows the browser to send session cookies
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// Middleware: parse incoming JSON request bodies
app.use(express.json());

// Middleware: enable persistent login sessions
app.use(sessionMiddleware);

// Authentication API: routes defined in routes/auth.js
app.use("/api/auth", authRoutes);

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
    // Read optional filters from URL query parameters
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
    // Return HTTP 500 if the database query fails
    console.error("Failed to fetch classes:", error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
