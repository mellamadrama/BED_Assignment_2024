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

    static async getWeekByUserCatId(catId, userId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM CatWeek WHERE catId = @catId AND userId = @userId`;
    
        const request = connection.request();
        request.input("catId", catId);
        request.input("userId", userId);
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

    static async getAllCatDataInput() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM CatDataInput`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
          (row) => new Category(row.userId, row.catId, row.dataId, row.weekName, row.info, row.amount, row.dateInput)
        );
    }

    static async getCatDataInputByIds(userId, catId, dataId, weekName) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM CatDataInput WHERE userId = @userId AND catId = @catId AND dataId = @dataId AND weekName = @weekName`;
    
        const request = connection.request();
        request.input("userId", userId);
        request.input("catId", catId);
        request.input("dataId", dataId);
        request.input("weekName", weekName);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset[0]
          ? new CatDataInput(
              result.recordset[0].dataId,
              result.recordset[0].catId,
              result.recordset[0].weekName,
              result.recordset[0].userId,
              result.recordset[0].info,
              result.recordset[0].amount,
              result.recordset[0].dateInput
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
            resultInsert.recordset[0].catId,
            resultInsert.recordset[0].userId
        );
    }

    static async createWeek(newWeekData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQueryCheck = `SELECT * FROM CatDataInput WHERE userId = @userId AND catId = @catId AND weekName = @weekName`;
        const sqlQueryInsert = `INSERT INTO CatDataInput (dataId, catId, weekName, userId, info, amount, dateInput) 
                                VALUES (@dataId, @catId, @weekName, @userId, @info, @amount, @dateInput)`;
        const request = connection.request();
        request.input("catId", newCatDataInput.catId);
        request.input("weekName", newCatDataInput.weekName);
        request.input("userId", newCatDataInput.userId);
        request.input("info", newCatDataInput.info);
        request.input("amount", newCatDataInput.amount);
        request.input("dateInput", newCatDataInput.dateInput);
    
        const resultCheck = await request.query(sqlQueryCheck);
        const resultInsert = await request.query(sqlQueryInsert);
    
        connection.close();

        if (resultCheck.recordset.length === 0) {
            throw new Error('No matching CatWeek entry found for the provided catId, weekName, and userId');
        }

        const resultLastDataId = await request.query(sqlQueryLastDataId);
        let newDataId;
        if (resultLastDataId.recordset.length > 0) {
            const lastDataId = resultLastDataId.recordset[0].dataId;
            const lastIdNumber = parseInt(lastDataId.slice(2));
            newDataId = `CD${String(lastIdNumber + 1).padStart(8, '0')}`;
        } else {
            newDataId = 'CD00000001';
        }
        request.input("dataId", newDataId);

        return this.getCatDataInputByIds(
            newDataId,
            resultInsert.recordset[0].catId,
            resultInsert.recordset[0].weekName,
            resultInsert.recordset[0].userId,
            resultInsert.recordset[0].info,
            resultInsert.recordset[0].amount,
            resultInsert.recordset[0].dateInput
        );
    }

    //update
    static async updateWeekName(catid, userid, weekName, newWeekName) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE CatWeek SET weekName = @weekName WHERE catId = @catid AND userId = @userId AND weekName = @weekName`;
    
        const request = connection.request();
        request.input("catId", catid);
        request.input("userId", userid);
        request.input("weekName", weekName);
        request.input("weekName", newWeekName.weekName || null);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getWeekByUserCatId(catid, userid);
    }

    static async updateCatDataInput(dataId, catId, weekName, userId, updatedData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE CatDataInput 
                            SET info = @info, amount = @amount, dateInput = @dateInput
                            WHERE dataId = @dataId AND catId = @catId AND weekName = @weekName AND userId = @userId`;
    
        const request = connection.request();
        request.input("dataId", dataId);
        request.input("catId", catId);
        request.input("weekName", weekName);
        request.input("userId", userId);
        request.input("info", updatedData.info);
        request.input("amount", updatedData.amount);
        request.input("dateInput", updatedData.dateInput);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getCatDataInputByIds(userId, catId, dataId, weekName);
    }
    
    //delete
}

module.exports = Category;