require("dotenv").config();

const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const { classes } = require("./schema");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

const classData = [
  {
    id: 1,
    name: "POWER HOUR",
    time: "06:00 AM",
    day: "MON",
    intensity: "INTENSE",
    spots: 8,
  },
  {
    id: 2,
    name: "REDLINE CIRCUIT",
    time: "08:00 AM",
    day: "MON",
    intensity: "INTERMEDIATE",
    spots: 4,
  },
  {
    id: 3,
    name: "ELITE STRENGTH",
    time: "10:30 AM",
    day: "MON",
    intensity: "INTENSE",
    spots: 0,
  },
  {
    id: 4,
    name: "HIIT BLAST",
    time: "05:00 PM",
    day: "MON",
    intensity: "INTENSE",
    spots: 12,
  },
  {
    id: 5,
    name: "RECOVERY FLOW",
    time: "06:30 PM",
    day: "MON",
    intensity: "BEGINNER",
    spots: 15,
  },
  {
    id: 6,
    name: "LATE STRENGTH",
    time: "07:45 PM",
    day: "MON",
    intensity: "INTERMEDIATE",
    spots: 2,
  },
  {
    id: 7,
    name: "MORNING MOBILITY",
    time: "07:00 AM",
    day: "TUE",
    intensity: "BEGINNER",
    spots: 10,
  },
  {
    id: 8,
    name: "REDLINE CIRCUIT",
    time: "09:00 AM",
    day: "TUE",
    intensity: "INTERMEDIATE",
    spots: 6,
  },
  {
    id: 9,
    name: "HIIT BLAST",
    time: "12:00 PM",
    day: "TUE",
    intensity: "INTENSE",
    spots: 5,
  },
  {
    id: 10,
    name: "STRENGTH FOUNDATIONS",
    time: "04:00 PM",
    day: "TUE",
    intensity: "BEGINNER",
    spots: 12,
  },
  {
    id: 11,
    name: "POWER HOUR",
    time: "06:00 PM",
    day: "TUE",
    intensity: "INTENSE",
    spots: 3,
  },
  {
    id: 12,
    name: "EVENING CONDITIONING",
    time: "08:00 PM",
    day: "TUE",
    intensity: "INTERMEDIATE",
    spots: 0,
  },
];

async function seed() {
  try {
    await db.insert(classes).values(classData).onConflictDoNothing();
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seed();
