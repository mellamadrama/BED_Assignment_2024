const sql = require("mssql");
const dbConfig = require("../dbConfig");

class MonthlyPoints {
    constructor(userId, username, userMonthlyPoints) {
        this.userId = userId;
        this.username = username;
        this.userMonthlyPoints = userMonthlyPoints;
    }

    static async getAllMonthlyPoints() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM MonthlyPoints ORDER BY ABS(userMonthlyPoints) DESC`; 
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
            (row) => new MonthlyPoints(row.userId, row.username, row.userMonthlyPoints)
        );
    }

    static async resetMonthlyPoints() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `Update MonthlyPoints SET MonthlyPoints = 0`; 

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0; 
    }

    static async getMonthlyUserPoints(uId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM MonthlyPoints WHERE userId = @uId`; 
    
        const request = connection.request();
        request.input("userId", uId);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
            ? new Points(
                result.recordset[0].userId,
                result.recordset[0].username,
                result.recordset[0].userMonthlyPoints
            )
            : null;
    }

}

module.exports = MonthlyPoints;