const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Weeks {
    constructor(weekName, catId, userId) {
        this.weekName = weekName;
        this.catId = catId;
        this.userId = userId;
    }

    //get(read)
    static async getAllWeeks() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM CatWeek`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
        (row) => new Weeks(row.weekName, row.catId, row.userId)
        );
    }

    static async getWeekByUserCatId(catId, userId) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM CatWeek WHERE catId = @catId AND userId = @userId`;

        const request = connection.request();
        request.input("catId", catId);
        request.input("userId", userId);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0]
        ? new Weeks(
            result.recordset[0].weekName,
            result.recordset[0].catId,
            result.recordset[0].userId
        )
        : null;
    }

    //create
    static async createWeek(newWeekData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQueryCheck = `SELECT * FROM CatWeek WHERE weekName = @weekName AND catId = @catId AND userId = @userId`;
        const sqlQueryInsert = `INSERT INTO CatWeek (weekName, catId, userId) VALUES (@weekName, @catId, @userId);`;
    
        const request = connection.request();
        request.input("weekName", newWeekData.weekName);
        request.input("catId", newWeekData.catId);
        request.input("userId", newWeekData.userId);
    
        const resultCheck = await request.query(sqlQueryCheck);
        const resultInsert = await request.query(sqlQueryInsert);
    
        connection.close();

        if (resultCheck.recordset.length > 0) {
            return null; // Week already exists
        }
        return this.getWeekByUserCatId(
            newWeekData.catId,
            newWeekData.userId
        );
    }

    //update
    static async updateWeekName(catid, userid, weekName, newWeekName) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE CatWeek SET weekName = @newWeekName WHERE catId = @catid AND userId = @userId AND weekName = @weekName`;
    
        const request = connection.request();
        request.input("catId", catId);
        request.input("userId", userId);
        request.input("weekName", weekName);
        request.input("newWeekName", newWeekName.weekName || null);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getWeekByUserCatId(catId, userId);
    }
    
    //delete
    static async deleteWeek(weekName, catId, userId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM CatWeek 
                            WHERE weekName = @weekName AND catId = @catId AND userId = @userId`;
    
        const request = connection.request();
        request.input("weekName", weekName);
        request.input("catId", catId);
        request.input("userId", userId);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0;
    }
}

module.exports = Weeks;