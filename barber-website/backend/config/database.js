require("dotenv").config();
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "database",
  database: "barbershop",
  password: process.env.database_password,
  port: 5432,
});

module.exports = pool;
