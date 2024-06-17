const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Location {
    constructor(id, name, address, status, websiteLink, userId, adminId) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.status = status;
        this.websiteLink = websiteLink;
        this.userId = userId;
        this.adminId = adminId;
    }

    static async getAllLocations() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM LocationReq`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
            (row) => new Location(row.id, row.name, row.address, row.status, row.websiteLink, row.userId, row.adminId)
        ); //Convert rows to location objects
    }

    static async getLocationById(id) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM LocationReq WHERE id = @id`; // Parameterized query
    
        const request = connection.request();
        request.input("id", id);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
            ? new Location(
                result.recordset[0].id,
                result.recordset[0].name,
                result.recordset[0].address,
                result.recordset[0].status,
                result.recordset[0].websiteLink,
                result.recordset[0].userId,
                result.recordset[0].adminId
            )
            : null; // Handle book not found
    }
}