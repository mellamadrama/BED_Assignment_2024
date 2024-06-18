const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Categories {
    constructor(catId, catName, dataId, userId, info, amount, dateInput, weekName) {
        this.catId = catId;
        this.catName = catName;
        this.dataId = dataId;
        this.userId = userId
        this.info = info;
        this.amount = amount;
        this.dateInput = dateInput;
        this.weekName = weekName
    }

    //get(read)
    static async getAllCategories() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Category`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
          (row) => new Category(row.catId, row.catName)
        );
    }

    static async getAllWeeks() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM CatWeek`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
          (row) => new Week(row.weekName, row.catId, row.userId)
        );
    }

    static async getWeekByUserCatId(catid, userid) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM CatWeek WHERE catId = @catId AND userId = @userId`;
    
        const request = connection.request();
        request.input("catId", catid);
        request.input("userId", userid);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
          ? new Week(
              result.recordset[0].weekName,
              result.recordset[0].catId,
              result.recordset[0].userId
            )
          : null;
    }

    //create
    static async createWeek(newWeekData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQueryCheck = `SELECT * FROM CatWeek WHERE catId = @catId AND userId = @userId`;
        const sqlQueryInsert = `INSERT INTO CatWeek (weekName, catId, userId) VALUES (@weekName, @catId, @userId);`;
    
        const request = connection.request();
        request.input("weekName", newWeekData.weekName);
        request.input("catId", newWeekData.catid);
        request.input("userId", newWeekData.userid);
    
        const resultCheck = await request.query(sqlQueryCheck);
        const resultInsert = await request.query(sqlQueryInsert);
    
        connection.close();

        if (resultCheck.recordset.length > 0) {
            return null; // Week already exists
        }
        return this.getWeekByUserCatId(
            resultInsert.recordset[0].weekName,
        );
    }

    //update
    
    //delete
}

module.exports = Category;