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
        try {
            const connection = await sql.connect(dbConfig);

            // Construct the dynamic query
            let sqlQuery = `
            UPDATE Account 
            SET `;
            const fields = [];
            if (newUserData.username) fields.push("username = @username");
            if (newUserData.firstName) fields.push("firstName = @firstName");
            if (newUserData.lastName) fields.push("lastName = @lastName");
            if (newUserData.email) fields.push("email = @email");
            if (newUserData.password) fields.push("password = @password");
            sqlQuery += fields.join(", ");
            sqlQuery += `
            WHERE accId = @userId`;

            const request = connection.request();

            request.input("userId", userId); 
            if (newUserData.username) request.input("username", newUserData.username);
            if (newUserData.firstName) request.input("firstName", newUserData.firstName);
            if (newUserData.lastName) request.input("lastName", newUserData.lastName);
            if (newUserData.email) request.input("email", newUserData.email);
            if (newUserData.password) request.input("password", newUserData.password);

            await request.query(sqlQuery);

            connection.close();
            
            return await User.getAllUsersById(userId);
        } catch (error) {
            console.error("Error updating User:", error);
            throw error;
        }
    }
}

module.exports = User;