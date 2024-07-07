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

    // get user details
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


    //get user details by ID
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


    // //update user account details
    // static async updateUserAccount(userId, newUserData) {
    //     const connection = await sql.connect(dbConfig);

    //     const sqlQuery = `
    //     UPDATE Account
    //     SET username = @username, firstName = @firstName, lastName = @lastName, email = @email, password = @password
    //     WHERE accId = @userId;
    //     `;

    //     const request = connection.request();

    //     request.input("userId", userId); 
    //     request.input("username", newUserData.username);
    //     request.input("firstName", newUserData.firstName);
    //     request.input("lastName", newUserData.lastName );
    //     request.input("email", newUserData.email || null);
    //     request.input("password", newUserData.password || null);

    //     const result = await request.query(sqlQuery);

    //     connection.close();
        
    //     return result.getAllUsersById(userId);
    // }

    static async updateUsername(userId, username) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
        UPDATE Account
        SET username = @username
        WHERE accId = @userId`;

        const request = connection.request();
        request.input("username", username);
        request.input("userId", userId)
        
        await request.query(sqlQuery);

        connection.close();

        return this.getAllUsersById(userId);
    }

    static async updateFirstname(userId, firstName) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
        UPDATE Account
        SET firstName = @firstName
        WHERE accId = @userId`;

        const request = connection.request();
        request.input("firstName", firstName);
        request.input("userId", userId)
        
        await request.query(sqlQuery);

        connection.close();

        return this.getAllUsersById(userId);
    }

    static async updateLastname(userId, lastName) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
        UPDATE Account
        SET lastName = @lastName
        WHERE accId = @userId`;

        const request = connection.request();
        request.input("lastName", lastName);
        request.input("userId", userId)
        
        await request.query(sqlQuery);

        connection.close();

        return this.getAllUsersById(userId);
    }

    static async updateEmail(userId, email) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
        UPDATE Account
        SET email = @email
        WHERE accId = @userId`;

        const request = connection.request();
        request.input("email", email);
        request.input("userId", userId)
        
        await request.query(sqlQuery);

        connection.close();

        return this.getAllUsersById(userId);
    }
}

module.exports = User;