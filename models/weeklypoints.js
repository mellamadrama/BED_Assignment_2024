class WeeklyPoints {
    constructor(userId, userWeeklyPoints) {
        this.userId = userId;
        this.userWeeklyPoints = userWeeklyPoints;
    }

    static async getAllWeeklyPoints() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM WeeklyPoints ORDER BY userWeeklyPoints DESC`; 
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
            (row) => new Points(row.userId, row.userWeeklyPoints)
        );
    }

    static async resetWeeklyPoints() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `Update WeeklyPoints SET WeeklyPoints = 0`; 

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0; 
    }

    static async getWeeklyUserPoints(uId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM WeeklyPoints WHERE userId = @uId`; 
    
        const request = connection.request();
        request.input("userId", uId);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
            ? new Points(
                result.recordset[0].userId,
                result.recordset[0].userWeeklyPoints
            )
            : null;
    }
}