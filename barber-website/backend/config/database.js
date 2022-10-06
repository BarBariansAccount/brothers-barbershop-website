const Pool = require('pg').Pool;
const pool =new Pool({
  user: "postgres",
  host: "barbershopdb",
  database: "barbershop",
  password: "November199853@",
  port: 5432,
});

module.exports = pool; 
