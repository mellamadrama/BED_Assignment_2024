const sql = require('mssql');
const dbConfig = require('../dbConfig');

class Account {
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }

  static async getUserByUsername(username) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `
    SELECT a.accId, a.username, a.password
    FROM Account a
    JOIN UserAcc u
    ON a.accId = u.userId
    WHERE a.username = @username
  `;

    const request = connection.request();
    request.input("username", sql.NVarChar, username);
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