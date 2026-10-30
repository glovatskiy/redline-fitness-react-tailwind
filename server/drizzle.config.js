require("dotenv").config();

const { defineConfig } = require("drizzle-kit");

module.exports = defineConfig({
  dialect: "postgresql",
  schema: "./db/schema.js",
  out: "./drizzle",

  // Manage application tables only.
  // Preserve the session table managed by connect-pg-simple.
  tablesFilter: ["classes", "users", "memberships", "orders", "order_items"],

  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
