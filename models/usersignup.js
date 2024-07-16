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

    static async createUserAccount(userDetails) {
        const connection = await sql.connect(dbConfig);
        
        const sqlQuery = `
        INSERT INTO Account (accId, username, firstName, lastName, email, password)
        VALUES (@userId, @username, @firstName, @lastName, @email, @password)

        INSERT INTO UserAcc (userId)
        VALUES (@userId)
        `;

        const request = connection.request();
        request.input("userId", userDetails.userId); 
        request.input("username", userDetails.username);
        request.input("firstName", userDetails.firstName);
        request.input("lastName", userDetails.lastName);
        request.input("email", userDetails.email);
        request.input("password", userDetails.password);

        const result = await request.query(sqlQuery);
        connection.close();
        return result;
    }
}

module.exports = User;