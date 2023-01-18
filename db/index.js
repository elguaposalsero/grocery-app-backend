const { Pool } = require("pg");

const pool = new Pool({ database: "shopping_list" });

async function query(text, params) {
  return await pool.query(text, params);
}

module.exports = query;
