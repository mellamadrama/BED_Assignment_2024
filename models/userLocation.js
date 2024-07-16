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

    static async getAllLocations() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM LocationReq;`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        console.log(result.recordset); // Debugging: Print raw SQL results

        connection.close();

        return result.recordset.map(
            (row) => new Location(row.locationReqId, row.name, row.address, row.status, row.websiteLink, row.userId, row.adminId)
        ); // Convert rows to location objects
    }

    static async getLocationByUserId(userId) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM LocationReq WHERE userId = @userId;`;

        const request = connection.request();
        request.input("userId", userId);
        const result = await request.query(sqlQuery);

        console.log(result.recordset); 

        connection.close();

        return result.recordset.map(
            (row) => new Location(row.locationReqId, row.name, row.address, row.status, row.websiteLink, row.userId, row.adminId)
        ); 
    }
}

module.exports = Location;