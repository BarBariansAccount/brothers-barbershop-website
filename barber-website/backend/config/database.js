const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "104.225.142.153",
  database: "barbershop",
  password: "POSTGRES",
  port: 5432,
});

module.exports = pool;
