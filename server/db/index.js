const { Pool } = require("pg");
const { drizzle } = require("drizzle-orm/node-postgres");

// Create a PostgreSQL connection pool using the Neon URL from .env
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Initialize Drizzle ORM with the PostgreSQL connection
const db = drizzle(pool);

// Export the database instance for use in API routes
module.exports = { db };
