require("dotenv").config();

const { drizzle } = require("drizzle-orm/node-postgres");
const { Pool } = require("pg");
const { classes, memberships } = require("./schema");

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

const membershipData = [
  {
    id: 1,
    name: "DROP IN",
    priceCents: 3500,
    currency: "usd",
    period: "/class",
    priceNote: null,
    features: ["Single class access", "Full amenities", "No commitment"],
    buttonText: "PURCHASE",
    featured: false,
  },
  {
    id: 2,
    name: "REDLINE 8",
    priceCents: 18000,
    currency: "usd",
    period: "/mo",
    priceNote: "$22.50 PER CLASS",
    features: [
      "8 classes per month",
      "10% off retail",
      "Priority booking",
      "Guest pass per month",
    ],
    buttonText: "SELECT PLAN",
    featured: true,
  },
  {
    id: 3,
    name: "UNLIMITED",
    priceCents: 28500,
    currency: "usd",
    period: "/mo",
    priceNote: null,
    features: [
      "Unlimited classes",
      "15% off retail",
      "Redline Recovery access",
      "Free hand wraps",
    ],
    buttonText: "SELECT PLAN",
    featured: false,
  },
];

async function seed() {
  try {
    await db.insert(classes).values(classData).onConflictDoNothing();

    console.log("Fitness classes seeded successfully!");

    await db.insert(memberships).values(membershipData).onConflictDoNothing();

    console.log("Membership plans seeded successfully!");
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

seed();
