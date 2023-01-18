const { Client } = require("pg");
const fs = require("fs");

async function configDatabase() {
  const client = new Client({ database: "shopping_list" });
  await client.connect();

  // Drop the existing tables and recreate tables from scratch & insert some initial dummy data
  const schemaSQL = fs.readFileSync("schema.sql", "utf8");
  await client.query(schemaSQL);

  await client.end();
}

configDatabase();
