const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "172.21.0.2",
  database: "barbershop",
  password: "POSTGRES",
  port: 5432,
});

module.exports = pool;
