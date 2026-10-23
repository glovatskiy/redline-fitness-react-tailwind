const { pgTable, integer, varchar } = require("drizzle-orm/pg-core");

const classes = pgTable("classes", {
  id: integer("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  time: varchar("time", { length: 20 }).notNull(),
  day: varchar("day", { length: 3 }).notNull(),
  intensity: varchar("intensity", { length: 20 }).notNull(),
  spots: integer("spots").notNull(),
});

module.exports = { classes };
