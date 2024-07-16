const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Location {
    constructor(locationReqId, name, address, status, websiteLink, userId, adminId) {
        this.locationReqId = locationReqId; 
        this.name = name;
        this.address = address;
        this.status = status;
        this.websiteLink = websiteLink;
        this.userId = userId;
        this.adminId = adminId;
    }

    static async getApprovedLocationsByAdminId(adminId) {
        let connection;
        try {
            connection = await sql.connect(dbConfig);

            const sqlQuery = `
                SELECT 
                    LR.locationReqId,
                    LR.userId AS memberId,
                    LR.name,
                    LR.address,
                    LR.status,
                    A.username AS adminUsername
                FROM 
                    LocationReq LR
                INNER JOIN 
                    Account A ON LR.adminId = A.accId
                WHERE 
                    LR.status = 'A' AND
                    LR.adminId = @adminId;
            `;

            const request = connection.request();
            request.input("adminId", sql.Char, adminId);

            const result = await request.query(sqlQuery);

            return result.recordset;
        } catch (error) {
            console.error("Error retrieving approved locations:", error);
            throw error;
        } finally {
            if (connection) {
                connection.close();
            }
        }
    }
}

module.exports = Location;
