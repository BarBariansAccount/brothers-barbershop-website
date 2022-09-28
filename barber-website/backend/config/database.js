const Pool = require('pg').Pool;
const pool =new Pool({
  user: "postgres",
  host: "localhost",
  database: "barbershop",
  password: "November199853@",
  port: 5432,
});

module.exports = pool; 