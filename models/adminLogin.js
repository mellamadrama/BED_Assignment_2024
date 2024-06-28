const sql = require('mssql');
const dbConfig = require('../dbConfig');

class Account {
  constructor(adminId, username, password) {
    this.adminId = adminId;
    this.username = username;
    this.password = password;
  }

  static async getAdminByUsernameAndPassword(username, password) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `
    SELECT a.accId, a.username, a.password
    FROM Account a
    JOIN Admin ad
    ON a.accId = ad.adminId
    WHERE a.username = @username AND a.password = @password
  `;

    const request = connection.request();
    request.input("username", sql.NVarChar, username);
    request.input("password", sql.NVarChar, password);
    const result = await request.query(sqlQuery);

    connection.close();

    return result.recordset[0]
      ? new Account(
          result.recordset[0].accId,
          result.recordset[0].username,
          result.recordset[0].password
        )
      : null;
  }
}

module.exports = Account;