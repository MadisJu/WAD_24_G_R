 const Pool = require('pg').Pool;
 const pool = new Pool({
     user: "postgres",
     password: "supausa",
     database: "WAD_Team_Retired",
     host: "localhost",
     port: "5432"
 });
 
 module.exports = pool;