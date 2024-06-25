const sql = require("mssql");
const dbConfig = require("../dbConfig");

async function getUserByUsername(username) {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query('SELECT * FROM Account WHERE username = @username');
    await sql.close();
    return result.recordset[0];
  } catch (err) {
    console.error("Database query failed:", err);
    throw new Error('Database query failed');
  }
}

module.exports = {
  getUserByUsername
};
