class Points {
    constructor(userId, userWeeklyPoints, userMonthlyPoints) {
        this.userId = userId;
        this.userWeeklyPoints = userWeeklyPoints;
        this.userMonthlyPoints = userMonthlyPoints;
    }

    static async getAllWeeklyPoints() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM WeeklyPoints`; 
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
            (row) => new Points(row.userId, row.userWeeklyPoints)
        );
    }

    static async getAllMonthlyPoints() {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM MonthlyPoints`; 
    
        const request = connection.request();
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
            (row) => new Challenge(row.userId, row.userMonthlyPoints)
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

    static async resetMonthlyPoints() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `Update MonthlyPoints SET MonthlyPoints = 0`; 

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0; 
    }
}