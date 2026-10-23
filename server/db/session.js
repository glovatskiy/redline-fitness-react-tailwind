const session = require("express-session");
const connectPgSimple = require("connect-pg-simple");
const { Pool } = require("pg");

// PostgreSQL session store for express-session
const PgSession = connectPgSimple(session);

// Store login sessions in Neon PostgreSQL
const sessionPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const isProduction = process.env.NODE_ENV === "production";

const sessionMiddleware = session({
  store: new PgSession({
    pool: sessionPool,
    tableName: "session",
    createTableIfMissing: true,
  }),

  // Secret used to sign the session cookie
  secret: process.env.SESSION_SECRET,

  // Avoid saving unchanged sessions
  resave: false,

  // Don't create sessions for unauthenticated visitors
  saveUninitialized: false,

  // Trust Render's HTTPS reverse proxy in production
  proxy: isProduction,

  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
});

module.exports = sessionMiddleware;
