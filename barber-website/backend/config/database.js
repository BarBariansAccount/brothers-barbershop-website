const Pool = require('pg').Pool;
const pool =new Pool({
  user: "postgres",
  host: "localhost",
  database: "barbershop",
  password: "POSTGRES",
  port: 5432,
});

module.exports = pool; 
