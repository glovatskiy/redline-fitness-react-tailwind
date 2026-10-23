const express = require("express");
const bcrypt = require("bcryptjs");
const { eq } = require("drizzle-orm");

const { db } = require("../db");
const { users } = require("../db/schema");

const router = express.Router();

// POST /api/auth/signup: register a new user
router.post("/signup", async (req, res) => {
  try {
    // Read registration details from the request body
    const { name, email, password } = req.body || {};

    // Validate required fields
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
      password.length < 8 ||
      name.trim().length > 100 ||
      email.trim().length > 255
    ) {
      return res.status(400).json({
        error:
          "Provide a valid name, email, and password (at least 8 characters)",
      });
    }

    // Normalize email to prevent duplicates with different casing
    const normalizedEmail = email.trim().toLowerCase();

    // Check whether the email is already registered
    const existingUsers = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, normalizedEmail))
      .limit(1);

    if (existingUsers.length > 0) {
      return res.status(409).json({ error: "Email already registered" });
    }

    // Hash the password before storing it in PostgreSQL
    const passwordHash = await bcrypt.hash(password, 12);

    // Create the user and return only safe account fields
    const [newUser] = await db
      .insert(users)
      .values({
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      });

    // Regenerate the session to prevent session fixation
    req.session.regenerate((error) => {
      if (error) {
        console.error("Session creation failed:", error);
        return res.status(500).json({ error: "Could not create session" });
      }

      // Store the user's ID in the session
      req.session.userId = newUser.id;

      // Save the session in PostgreSQL
      req.session.save((saveError) => {
        if (saveError) {
          console.error("Session save failed:", saveError);
          return res.status(500).json({ error: "Could not save session" });
        }

        res.status(201).json({ user: newUser });
      });
    });
  } catch (error) {
    // PostgreSQL unique constraint: email already exists
    if (error.code === "23505" || error.cause?.code === "23505") {
      return res.status(409).json({ error: "Email already registered" });
    }

    console.error("Signup failed:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// POST /api/auth/login: sign in an existing user
router.post("/login", async (req, res) => {
  try {
    // Read login credentials from the request body
    const { email, password } = req.body || {};

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Find the user by email
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.email, email.trim().toLowerCase()))
      .limit(1);

    // Compare the entered password with the stored bcrypt hash
    const validPassword = user
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Create a new session after successful authentication
    req.session.regenerate((error) => {
      if (error) {
        console.error("Session creation failed:", error);
        return res.status(500).json({ error: "Login failed" });
      }

      // Store the authenticated user's ID
      req.session.userId = user.id;

      // Persist the session in PostgreSQL
      req.session.save((saveError) => {
        if (saveError) {
          console.error("Session save failed:", saveError);
          return res.status(500).json({ error: "Login failed" });
        }

        // Never return the password hash to the frontend
        res.json({
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      });
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

// GET /api/auth/me: check the current login session
router.get("/me", async (req, res) => {
  try {
    // No user ID in the session means the visitor is not logged in
    if (!req.session.userId) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    // Retrieve the authenticated user's public account information
    const [user] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
      })
      .from(users)
      .where(eq(users.id, req.session.userId))
      .limit(1);

    if (!user) {
      return res.status(401).json({
        error: "Not authenticated",
      });
    }

    res.json({ user });
  } catch (error) {
    console.error("Session lookup failed:", error);
    res.status(500).json({
      error: "Could not retrieve user",
    });
  }
});

// POST /api/auth/logout: end the current login session
router.post("/logout", (req, res) => {
  // Delete the session from PostgreSQL
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout failed:", error);
      return res.status(500).json({
        error: "Logout failed",
      });
    }

    // Remove the session cookie from the browser
    res.clearCookie("connect.sid", { path: "/" });

    res.json({
      message: "Logged out successfully",
    });
  });
});

module.exports = router;
