const session = require("express-session");
const connectPgSimple = require("connect-pg-simple");
const { Pool } = require("pg");

// PostgreSQL session store for express-session
const PgSession = connectPgSimple(session);

// Store login sessions in the same Neon PostgreSQL database
const sessionPool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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

  cookie: {
    httpOnly: true, // JavaScript cannot read the cookie
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
});

module.exports = sessionMiddleware;
