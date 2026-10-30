const express = require("express");
const cors = require("cors");
const { eq, and } = require("drizzle-orm");
require("dotenv").config();

// Database connection and schema
const { db } = require("./db");
const { classes, memberships } = require("./db/schema");

// PostgreSQL-backed authentication sessions
const sessionMiddleware = require("./db/session");

// Authentication routes (signup, login, logout)
const authRoutes = require("./routes/auth");

// STRIPE-CHECKOUT: Import Stripe Checkout routes
const checkoutRoutes = require("./routes/checkout");

// STRIPE-CHECKOUT: Import Stripe payment webhook routes
const webhookRoutes = require("./routes/webhook");

const app = express();
const PORT = process.env.PORT || 5001;

// Allow requests from local development and deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://redline-fitness-react-tailwind.vercel.app",
    ],
    credentials: true,
  }),
);

// STRIPE-CHECKOUT: Register webhook BEFORE express.json()
// Stripe requires the original request body to verify signatures
app.use("/api/stripe/webhook", webhookRoutes);

// Parse incoming JSON request bodies
app.use(express.json());

// Enable persistent login sessions
app.use(sessionMiddleware);

// Authentication API
app.use("/api/auth", authRoutes);

// STRIPE-CHECKOUT: Register checkout API routes
// POST /api/checkout creates a Stripe Checkout session
// The route requires the user to be logged in
app.use("/api/checkout", checkoutRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "REDLINE Fitness API is running",
  });
});

// GET /api/classes
app.get("/api/classes", async (req, res) => {
  try {
    const { day, intensity } = req.query;
    const conditions = [];

    if (day) {
      conditions.push(eq(classes.day, day.toUpperCase()));
    }

    if (intensity && intensity.toUpperCase() !== "ALL") {
      conditions.push(eq(classes.intensity, intensity.toUpperCase()));
    }

    const result = await db
      .select()
      .from(classes)
      .where(conditions.length ? and(...conditions) : undefined)
      .orderBy(classes.id);

    res.json(result);
  } catch (error) {
    console.error("Failed to fetch classes:", error);
    res.status(500).json({ error: "Failed to fetch classes" });
  }
});

// GET /api/memberships
// Retrieve membership plans and prices from PostgreSQL
app.get("/api/memberships", async (req, res) => {
  try {
    const result = await db.select().from(memberships).orderBy(memberships.id);

    res.json(result);
  } catch (error) {
    console.error("Failed to fetch memberships:", error);
    res.status(500).json({ error: "Failed to fetch memberships" });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
