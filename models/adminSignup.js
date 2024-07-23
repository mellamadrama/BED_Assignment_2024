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

    static generateAdminId(lastAdminId) {
        if (!lastAdminId) {
            return 'Acc0000001'; 
        }

        const numericPart = lastAdminId.slice(3); 
        const incrementedNumeric = (parseInt(numericPart) + 1).toString().padStart(7, '0');
        const newAdminId = `Acc${incrementedNumeric}`;
        return newAdminId;
    }

    static async createAdminAccount(adminDetails) {
        const connection = await sql.connect(dbConfig);

        const lastAdminId = await this.getLastAdminId(connection);

        const adminId = this.generateAdminId(lastAdminId);
        
        const sqlQuery = `
        INSERT INTO Account (accId, username, firstName, lastName, email, password)
        VALUES (@adminId, @username, @firstName, @lastName, @email, @password);

        INSERT INTO Admin (adminId)
        VALUES (@adminId);
        `;

        const request = connection.request();
        request.input("adminId", adminId); 
        request.input("username", adminDetails.username);
        request.input("firstName", adminDetails.firstName);
        request.input("lastName", adminDetails.lastName);
        request.input("email", adminDetails.email);
        request.input("password", adminDetails.password);

        const result = await request.query(sqlQuery);
        connection.close();
        return result;
    }

    static async getLastAdminId(connection) {
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

module.exports = Admin;
