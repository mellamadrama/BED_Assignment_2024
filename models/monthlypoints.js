const sql = require("mssql");
const dbConfig = require("../dbConfig");

class MonthlyPoints {
    constructor(userId, userMonthlyPoints) {
        this.userId = userId;
        this.userMonthlyPoints = userMonthlyPoints;
    }

    static async getAllMonthlyPoints() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM MonthlyPoints ORDER BY ABS(userMonthlyPoints) DESC`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
            (row) => new MonthlyPoints(row.userId, row.userMonthlyPoints)
        );
    }

    static async resetMonthlyPoints() {
        let connection;
        try {
            connection = await sql.connect(dbConfig);

            const sqlQuery = `UPDATE MonthlyPoints SET userMonthlyPoints = 0`;

            const request = connection.request();
            const result = await request.query(sqlQuery);

            return result.rowsAffected.length > 0;
        } catch (error) {
            console.error("Database error in resetMonthlyPoints:", error);
            throw error;
        } finally {
            if (connection) connection.close();
        }
    }

    static async getUserMonthlyPoints(userId) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM MonthlyPoints WHERE userId = @userId`;

        const request = connection.request();
        request.input("userId", sql.NVarChar, userId);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0]
            ? new MonthlyPoints(
                result.recordset[0].userId,
                result.recordset[0].userMonthlyPoints
            )
            : null;
    }

    static async addPointsToMonthly(points, userId) {
        try {
            const connection = await sql.connect(dbConfig);

            const sqlQuery = `
                UPDATE MonthlyPoints 
                SET userMonthlyPoints = userMonthlyPoints + @points
                WHERE userId = @userId
            `;

            const request = connection.request();
            request.input('points', sql.Int, points);
            request.input('userId', sql.NVarChar, userId);

            const result = await request.query(sqlQuery);

            connection.close();

            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error("Database error in addPointsToMonthly:", error);
            throw error;
        }
    }
}

module.exports = MonthlyPoints;
