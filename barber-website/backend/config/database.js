const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "database",
  database: "barbershop",
  password: "November199853@",
  port: 5432,
});

module.exports = pool;
