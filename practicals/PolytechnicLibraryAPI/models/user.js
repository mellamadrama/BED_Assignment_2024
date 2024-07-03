const sql = require("mssql");
const dbConfig = require("../dbConfig");

class User {
    constructor(user_id, username, passwordHash, role) {
        this.user_id = user_id;
        this.username = username;
        this.passwordHash = passwordHash;
        this.role = role;
    }

    static async getUserByUsername(username) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM Users WHERE username = @username`; // Parameterized query
    
        const request = connection.request();
        request.input("username", username);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
            ? new User(
                result.recordset[0].user_id,
                result.recordset[0].username,
                result.recordset[0].passwordHash,
                result.recordset[0].role
            )
            : null; // Handle user not found
    }

    static async registerUser(user) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `INSERT INTO Users (username, passwordHash, role) VALUES (@username, @passwordHash, @role); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record
        
        const request = connection.request();
        request.input("username", user.username);
        request.input("email", user.passwordHash);
        request.input("role", user.role);
        
        const result = await request.query(sqlQuery);
        
        connection.close();
        
        // Retrieve the newly created user using its ID
        return this.getUserById(result.recordset[0].user_id);
    }
}
module.exports = User;