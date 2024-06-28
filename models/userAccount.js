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

    static async getAllUsers() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
        SELECT a.accId, a.username, a.firstName, a.lastName, a.email, a.password
        FROM Account a
        JOIN UserAcc u
        ON a.accId = u.userId
        `;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
            (row) => new User(row.userId, row.username, row.firstName, row.lastName, row.email, row.password)
        );
    }

    static async getAllUsersById(userId) {
        try {
            const connection = await sql.connect(dbConfig);
    
            const sqlQuery = `
            SELECT a.accId, a.username, a.firstName, a.lastName, a.email, a.password
            FROM Account a
            JOIN UserAcc u
            ON a.accId = u.userId
            WHERE a.accId = @userId
          `;
    
            const request = connection.request();
            request.input("userId", userId); 
    
            const result = await request.query(sqlQuery);
    
            connection.close();
    
            return result.recordset[0]
        } catch (error) {
            console.error("Error fetching User:", error);
            throw error;
        }
    }

    static async updateUserAccount(userId, newUserData) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
        UPDATE Account 
        SET username = @username, firstName = @firstName, lastName = @lastName, email = @email, password = @password
        WHERE accId = @userId
        `;

        const request = connection.request();

        request.input("userId", userId); 
        request.input("username", newUserData.username || null);
        request.input("firstName", newUserData.firstName || null);
        request.input("lastName", newUserData.lastName || null);
        request.input("email", newUserData.email || null);
        request.input("password", newUserData.password || null);

        const result = await request.query(sqlQuery);
        connection.close();
        return this.getAllUsersById(userId);
    }
}

module.exports = User;