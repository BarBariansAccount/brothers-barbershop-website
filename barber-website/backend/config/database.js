const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "barbershop",
  database: "barbershop",
  password: "POSTGRES",
  port: 5432,
});

module.exports = pool;
