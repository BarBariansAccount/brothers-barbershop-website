const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "barbershop-db",
  database: "barbershop",
  password: "POSTGRES",
  port: 5432,
});

module.exports = pool;
