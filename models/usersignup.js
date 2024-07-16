const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
    constructor(userId, username, firstName, lastName, email, password) {
        this.userId = userId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    static generateUserId(lastUserId) {
        if (!lastUserId) {
            return 'Acc0000001'; 
        }

        const numericPart = lastUserId.slice(3); 
        const incrementedNumeric = (parseInt(numericPart) + 1).toString().padStart(7, '0');
        const newUserId = `Acc${incrementedNumeric}`;
        return newUserId;
    }

    static async createUserAccount(userDetails) {
        const connection = await sql.connect(dbConfig);

        const lastUserId = await this.getLastUserId(connection);

        const userId = this.generateUserId(lastUserId);
        
        const sqlQuery = `
        INSERT INTO Account (accId, username, firstName, lastName, email, password)
        VALUES (@userId, @username, @firstName, @lastName, @email, @password)

        INSERT INTO UserAcc (userId)
        VALUES (@userId)
        `;

        const request = connection.request();
        request.input("userId", userId); 
        request.input("username", userDetails.username);
        request.input("firstName", userDetails.firstName);
        request.input("lastName", userDetails.lastName);
        request.input("email", userDetails.email);
        request.input("password", userDetails.password);

        const result = await request.query(sqlQuery);
        connection.close();
        return result;
    }

    static async getLastUserId(connection) {
        const sqlQuery = `
        SELECT TOP 1 accId FROM Account
        ORDER BY accId DESC
        `;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        if (result.recordset.length > 0) {
            return result.recordset[0].accId;
        }
        return null;
    }
}

module.exports = User;