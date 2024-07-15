const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Location {
    constructor(locationReqId, name, address, status, websiteLink, userId, adminId) {
        this.locationReqId = locationReqId; // Remove trailing spaces
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

    static async getLocationById(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM LocationReq WHERE locationReqId = @locationReqId;`; // Parameterized query

        const request = connection.request();
        request.input("locationReqId", id);
        const result = await request.query(sqlQuery);

        console.log(result.recordset); // Debugging: Print raw SQL results

        connection.close();

        return result.recordset[0]
            ? new Location(
                result.recordset[0].locationReqId, // Remove trailing spaces
                result.recordset[0].name,
                result.recordset[0].address,
                result.recordset[0].status,
                result.recordset[0].websiteLink,
                result.recordset[0].userId,
                result.recordset[0].adminId
            )
            : null; // Handle location not found
    }

    static async getLocationByName(name) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM LocationReq WHERE name = @name;`;
        const request = connection.request();
        request.input("name", name);

        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.length > 0 ? result.recordset[0] : null;
    }

    static async createLocation(newLocationReqData) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `INSERT INTO LocationReq (name, address, status, websiteLink, userId, adminId) VALUES (@name, @address, @status, @websiteLink, @userId, @adminId); SELECT SCOPE_IDENTITY() AS locationReqId;`; // Parameterized query

        const request = connection.request();
        request.input("name", newLocationReqData.name);
        request.input("address", newLocationReqData.address);
        request.input("status", newLocationReqData.status);
        request.input("websiteLink", newLocationReqData.websiteLink);
        request.input("userId", newLocationReqData.userId);
        request.input("adminId", newLocationReqData.adminId);

        const result = await request.query(sqlQuery);

        connection.close();

        // Retrieve the newly created location using its ID
        return this.getLocationById(result.recordset[0].locationReqId);
    }

    static async updateLocation(id, newLocationReqData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE LocationReq SET name = @name, address = @address, status = @status, websiteLink = @websiteLink, userId = @userId, adminId = @adminId WHERE locationReqId = @locationReqId`;
        
        const request = connection.request();
        request.input("locationReqId", id);
        request.input("name", newLocationReqData.name || null);
        request.input("address", newLocationReqData.address || null);
        request.input("status", newLocationReqData.status || null);
        request.input("websiteLink", newLocationReqData.websiteLink || null);
        request.input("userId", newLocationReqData.userId || null);
        request.input("adminId", newLocationReqData.adminId || null);

        await request.query(sqlQuery);

        connection.close();

        return this.getLocationById(id); // Returning the updated location data
        
    }    
    

    static async deleteLocation(id) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `DELETE FROM LocationReq WHERE locationReqId = @locationReqId`; // Parameterized query

        const request = connection.request();
        request.input("locationReqId", id);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0; // Indicate success based on affected rows
    }
}

module.exports = Location;
