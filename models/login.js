const sql = require('mssql');
const dbConfig = require('../dbConfig');

class Account {
  constructor(userId, username, password) {
    this.userId = userId;
    this.username = username;
    this.password = password;
  }

  static async getUserByUsernameAndPassword(username, password) {
    const connection = await sql.connect(dbConfig);

    const sqlQuery = `SELECT * FROM Account WHERE username = @username AND password = @password`;

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