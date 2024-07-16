const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Admin {
    constructor(adminId, username, firstName, lastName, email, password) {
        this.adminId = adminId;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    // get user details
    static async getAllAdmins() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
        SELECT a.accId, a.username, a.firstName, a.lastName, a.email, a.password
        FROM Account a
        JOIN Admin ad
        ON a.accId = ad.adminId
        `;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
            (row) => new Admin(row.adminId, row.username, row.firstName, row.lastName, row.email, row.password)
        );
    }


    //get user details by ID
    static async getAllAdminsById(adminId) {
        try {
            const connection = await sql.connect(dbConfig);
    
            const sqlQuery = `
            SELECT a.accId, a.username, a.firstName, a.lastName, a.email, a.password
            FROM Account a
            JOIN Admin ad
            ON a.accId = ad.adminId
            WHERE a.accId = @adminId
          `;
    
            const request = connection.request();
            request.input("adminId", adminId); 
    
            const result = await request.query(sqlQuery);
    
            connection.close();
    
            return result.recordset[0]
        } catch (error) {
            console.error("Error fetching Admin:", error);
            throw error;
        }
    }

    static async updateAdminAccount(adminId, username, firstName, lastName, email, password) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
        UPDATE Account 
        SET username = @username, 
        firstName = @firstName, 
        lastName = @lastName, 
        email = @email, 
        password = @password
        WHERE accId = @adminId
        `;

        const request = connection.request();

        request.input("adminId", adminId); 
        request.input("username", username);
        request.input("firstName", firstName);
        request.input("lastName", lastName);
        request.input("email", email);
        request.input("password", password);

        await request.query(sqlQuery);

        const result = await request.query(`SELECT * FROM Account WHERE accId = @adminId`);
        
        connection.close();

        return result.recordset[0];
    }

    static async deleteAdminAccount(userId) {
        try {
            const connection = await sql.connect(dbConfig);
            const request = connection.request();
            request.input("adminId", sql.Char(10), adminId); 

            const sqlQuery = `
                DELETE FROM LocationReq WHERE adminId = @adminId;
                DELETE FROM Admin WHERE adminId = @adminId;
                DELETE FROM Account WHERE accId = @adminId;
            `;
   
            const result = await request.query(sqlQuery);
  
            connection.close();
            
            return result;
        } catch (error) {
            console.error("Error deleting Admin account: ", error);
            throw error;
        }
    }

}

module.exports = Admin;