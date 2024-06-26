const sql = require("mssql");
const dbConfig = require("../dbConfig");

class WeeklyPoints {
    constructor(userId, username, userWeeklyPoints) {
        this.userId = userId;
        this.username = username;
        this.userWeeklyPoints = userWeeklyPoints;
    }

    static async getAllWeeklyPoints() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM WeeklyPoints ORDER BY ABS(userWeeklyPoints) DESC`; 
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
            (row) => new WeeklyPoints(row.userId, row.username, row.userWeeklyPoints)
        );
    }

    static async resetWeeklyPoints() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `UPDATE WeeklyPoints SET userWeeklyPoints = 0`; 

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0; 
    }

    static async getWeeklyUserPoints(uId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM WeeklyPoints WHERE userId = @uId`; 
    
        const request = connection.request();
        request.input("uId", sql.Int, uId); 
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
            ? new WeeklyPoints(
                result.recordset[0].userId,
                result.recordset[0].username,
                result.recordset[0].userWeeklyPoints
            )
            : null;
    }
}

module.exports = WeeklyPoints;
