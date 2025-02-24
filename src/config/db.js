const pgp = require("pg-promise")();

const db = pgp({
  host: "localhost",
  // host: "172.18.0.3",
  port: 5432,
  database: "blog_db",
  user: "postgres",
  password: "postgres",
});

module.exports = db;
