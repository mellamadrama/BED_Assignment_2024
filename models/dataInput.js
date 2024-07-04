const sql = require("mssql");
const dbConfig = require("../dbConfig");

class DataInputs {
    constructor(weekName, catId, userId, dataId, info, amount, dateInput) {
        this.weekName = weekName;
        this.catId = catId;
        this.userId = userId;
        this.dataId = dataId;
        this.info = info;
        this.amount = amount;
        this.dateInput = dateInput;
    }

    //get(read)
    static async getAllCatDataInput() {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM CatDataInput`;

        const request = connection.request();
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
          (row) => new DataInputs(row.weekName, row.catId, row.userId, row.dataId, row.info, row.amount, row.dateInput)
        );
    }

    static async getCatDataInputByIds(weekName, catId, userId, dataId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM CatDataInput WHERE weekName = @weekName AND catId = @catId AND userId = @userId AND dataId = @dataId`;
    
        const request = connection.request();
        request.input("weekName", weekName);
        request.input("catId", catId);
        request.input("userId", userId);
        request.input("dataId", dataId);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
            (row) => new DataInputs(row.weekName, row.catId, row.userId, row.dataId, row.info, row.amount, row.dateInput)
          );
    }

    static async getCatDataInputById(weekName, catId, userId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT * FROM CatDataInput WHERE weekName = @weekName AND catId = @catId AND userId = @userId`;
    
        const request = connection.request();
        request.input("weekName", weekName);
        request.input("catId", catId);
        request.input("userId", userId);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.recordset.map(
            (row) => new DataInputs(row.weekName, row.catId, row.userId, row.dataId, row.info, row.amount, row.dateInput)
          );
    }

    //create
    static async createDataInput(newCatDataInput) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQueryCheck = `SELECT * FROM CatDataInput WHERE dataId = @dataId`;
    
        const sqlQueryLastDataId = `SELECT TOP 1 dataId FROM CatDataInput ORDER BY dataId DESC`;
        const requestLastDataId = connection.request();
        const resultLastDataId = await requestLastDataId.query(sqlQueryLastDataId);

        let newDataId;
        if (resultLastDataId.recordset.length > 0) {
            const lastDataId = resultLastDataId.recordset[0].dataId;
            const lastIdNumber = parseInt(lastDataId.slice(2));
            newDataId = `CD${String(lastIdNumber + 1).padStart(8, '0')}`;
        } else {
            newDataId = 'CD00000001';
        }

        const sqlQueryInsert = `INSERT INTO CatDataInput (weekName, catId, dataId, userId, info, amount, dateInput) 
                                VALUES (@weekName, @catId, @dataId, @userId, @info, @amount, @dateInput)`;
        
        const request = connection.request();

        request.input("weekName", newCatDataInput.weekName);
        request.input("catId", newCatDataInput.catId);
        request.input("userId", newCatDataInput.userId);
        request.input("dataId", newDataId);
        request.input("info", newCatDataInput.info);
        request.input("amount", newCatDataInput.amount);
        request.input("dateInput", newCatDataInput.dateInput);
    
        const resultCheck = await request.query(sqlQueryCheck);
        const resultInsert = await request.query(sqlQueryInsert);
    
        connection.close();

        if (resultCheck.recordset.length != 0) {
            throw new Error('Matching CatWeek entry found for the provided dataId');
        }

        return this.getCatDataInputByIds(
            newCatDataInput.weekName,
            newCatDataInput.catId,
            newCatDataInput.userId,
            newDataId,
            newCatDataInput.info,
            newCatDataInput.amount,
            newCatDataInput.dateInput
        );
    }

    //update
    static async updateCatDataInput(weekName, catId, userId, dataId, updatedData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE CatDataInput 
                            SET info = @info, amount = @amount, dateInput = @dateInput
                            WHERE weekName = @weekName AND catId = @catId AND userId = @userId AND dataId = @dataId`;
    
        const request = connection.request();
        request.input("weekName", weekName);
        request.input("catId", catId);
        request.input("userId", userId);
        request.input("dataId", dataId);
        request.input("info", updatedData.info);
        request.input("amount", updatedData.amount);
        request.input("dateInput", updatedData.dateInput);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getCatDataInputByIds(weekName, catId, userId, dataId);
    }

    //update all data inputs for a specific week
    static async updateAllCatDataInput(weekName, catId, userId, newWeekName) {
        const connection = await sql.connect(dbConfig);

        const sqlQueryDataInput = `UPDATE CatDataInput SET weekName = @newWeekName WHERE weekName = @weekName AND catId = @catId AND userId = @userId`;
                
        const requestDataInput = connection.request();
        console.log(weekName, catId, userId, newWeekName);
        requestDataInput.input("weekName", weekName);
        requestDataInput.input("catId", catId);
        requestDataInput.input("userId", userId);
        requestDataInput.input("newWeekName", newWeekName);
        await requestDataInput.query(sqlQueryDataInput);
    
        connection.close();
    
        return this.getCatDataInputById(weekName, catId, userId);

    }

    //delete single data input
    static async deleteCatDataInput(userId, catId, dataId, weekName) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM CatDataInput WHERE userId = @userId AND catId = @catId AND dataId = @dataId AND weekName = @weekName`;
    
        const request = connection.request();
        request.input("userId", userId);
        request.input("catId", catId);
        request.input("dataId", dataId);
        request.input("weekName", weekName);

        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0;
    }

    // Check for data inputs in a specific week
    static async hasDataInputs(weekName, catId, userId) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `SELECT COUNT(*) as count FROM CatDataInput WHERE weekName = @weekName AND catId = @catId AND userId = @userId`;
    
        const request = connection.request();
        request.input("weekName", weekName);
        request.input("catId", catId);
        request.input("userId", userId);
    
        const result = await request.query(sqlQuery);
        
        connection.close();
    
        return result.recordset[0].count > 0;
    }

    // Delete all data inputs for a specific week
    static async deleteCatDataInputs(weekName, catId, userId) {
        const connection = await sql.connect(dbConfig);
        const sqlQuery = `DELETE FROM CatDataInput WHERE weekName = @weekName AND catId = @catId AND userId = @userId`;
        const request = connection.request();
        request.input("weekName", weekName);
        request.input("catId", catId);
        request.input("userId", userId);

        const result = await request.query(sqlQuery);

        connection.close();

        return result.rowsAffected > 0;
    }
}

module.exports = DataInputs;