const sql = require("mssql");

async function getUserByUsername(username) {
  const request = new sql.Request();
  const result = await request
    .input("username", sql.VarChar, username)
    .query("SELECT * FROM Account WHERE username = @username");
  
  return result.recordset[0];
}

module.exports = {
  getUserByUsername,
};
