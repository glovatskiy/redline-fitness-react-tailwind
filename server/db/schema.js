const {
  pgTable,
  integer,
  varchar,
  serial,
  timestamp,
} = require("drizzle-orm/pg-core");

// Fitness classes stored in Neon PostgreSQL
const classes = pgTable("classes", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  day: varchar("day", { length: 3 }).notNull(),
  intensity: varchar("intensity", { length: 20 }).notNull(),
  spots: integer("spots").notNull(),
});

// Registered users for authentication
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Export tables so other backend files can use them
module.exports = { classes, users };
