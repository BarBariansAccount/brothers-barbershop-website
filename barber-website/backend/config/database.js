const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "database",
  database: "barbershop",
  password: "POSTGRES",
  port: 5432,
});

module.exports = pool;
