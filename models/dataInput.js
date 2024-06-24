const sql = require("mssql");
const dbConfig = require("../dbConfig");

class DataInputs {
    constructor(userId, catId, dataId, weekName, info, amount, dateInput) {
        this.userId = userId;
        this.catId = catId;
        this.dataId = dataId;
        this.weekName = weekName;
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
          (row) => new DataInputs(row.userId, row.catId, row.dataId, row.weekName, row.info, row.amount, row.dateInput)
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
          ? new DataInputs(
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
    static async createDataInput(newCatDataInput) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQueryCheck = `SELECT * FROM CatDataInput WHERE dataId = @dataId`;
        const sqlQueryInsert = `INSERT INTO CatDataInput (dataId, catId, weekName, userId, info, amount, dateInput) 
                                VALUES (@dataId, @catId, @weekName, @userId, @info, @amount, @dateInput)`;
        const request = connection.request();
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
        request.input("userId", newCatDataInput.userId);
        request.input("catId", newCatDataInput.catId);
        request.input("weekName", newCatDataInput.weekName);
        request.input("info", newCatDataInput.info);
        request.input("amount", newCatDataInput.amount);
        request.input("dateInput", newCatDataInput.dateInput);
    
        const resultCheck = await request.query(sqlQueryCheck);
        const resultInsert = await request.query(sqlQueryInsert);
    
        connection.close();

        if (resultCheck.recordset.length === 0) {
            throw new Error('No matching CatWeek entry found for the provided dataId');
        }

        return this.getCatDataInputByIds(
            newCatDataInput.userId,
            newCatDataInput.catId,
            newDataId,
            newCatDataInput.weekName,
            newCatDataInput.info,
            newCatDataInput.amount,
            newCatDataInput.dateInput
        );
    }

    //update
    static async updateCatDataInput(userId, catId, dataId, weekName, updatedData) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `UPDATE CatDataInput 
                            SET info = @info, amount = @amount, dateInput = @dateInput
                            WHERE dataId = @dataId AND catId = @catId AND weekName = @weekName AND userId = @userId`;
    
        const request = connection.request();
        request.input("userId", userId);
        request.input("catId", catId);
        request.input("dataId", dataId);
        request.input("weekName", weekName);
        request.input("info", updatedData.info);
        request.input("amount", updatedData.amount);
        request.input("dateInput", updatedData.dateInput);
    
        await request.query(sqlQuery);
    
        connection.close();
    
        return this.getCatDataInputByIds(userId, catId, dataId, weekName);
    }

    //delete
    static async deleteCatDataInput(userId, catId, dataId, weekName) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `DELETE FROM CatDataInput 
                            WHERE dataId = @dataId AND catId = @catId AND weekName = @weekName AND userId = @userId`;
    
        const request = connection.request();
        request.input("userId", userId);
        request.input("catId", catId);
        request.input("dataId", dataId);
        request.input("weekName", weekName);
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        return result.rowsAffected > 0;
    }
}

module.exports = DataInputs;