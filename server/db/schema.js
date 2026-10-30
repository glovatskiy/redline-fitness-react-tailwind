const {
  pgTable,
  integer,
  varchar,
  serial,
  timestamp,
  boolean,
  jsonb,
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

// Membership plans available for purchase
const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  priceCents: integer("price_cents").notNull(),
  currency: varchar("currency", { length: 3 }).default("usd").notNull(),
  period: varchar("period", { length: 20 }).notNull(),
  priceNote: varchar("price_note", { length: 100 }),
  features: jsonb("features").notNull(),
  buttonText: varchar("button_text", { length: 50 }).notNull(),
  featured: boolean("featured").default(false).notNull(),
});

// Orders created before starting Stripe Checkout
const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  totalCents: integer("total_cents").notNull(),
  currency: varchar("currency", { length: 3 }).default("usd").notNull(),
  stripeSessionId: varchar("stripe_session_id", {
    length: 255,
  }).unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  paidAt: timestamp("paid_at"),
});

// Items purchased within an order
const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id")
    .notNull()
    .references(() => orders.id),
  membershipId: integer("membership_id")
    .notNull()
    .references(() => memberships.id),
  name: varchar("name", { length: 100 }).notNull(),
  quantity: integer("quantity").default(1).notNull(),
  unitPriceCents: integer("unit_price_cents").notNull(),
});

// Export tables for use in backend routes
module.exports = {
  classes,
  users,
  memberships,
  orders,
  orderItems,
};
