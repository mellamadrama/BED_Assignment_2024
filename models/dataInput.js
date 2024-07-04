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
        console.log('1');
    
        const sqlQueryCheck = `SELECT * FROM CatDataInput WHERE dataId = @dataId`;
        console.log('2');
    
        const sqlQueryLastDataId = `SELECT TOP 1 dataId FROM CatDataInput ORDER BY dataId DESC`;
        console.log('3');
        const requestLastDataId = connection.request();
        console.log('4');
        const resultLastDataId = await requestLastDataId.query(sqlQueryLastDataId);
        console.log('5');

        let newDataId;
        console.log('6');
        if (resultLastDataId.recordset.length > 0) {
            console.log('7');
            const lastDataId = resultLastDataId.recordset[0].dataId;
            console.log('8');
            const lastIdNumber = parseInt(lastDataId.slice(2));
            console.log('9');
            newDataId = `CD${String(lastIdNumber + 1).padStart(8, '0')}`;
            console.log('10');
        } else {
            console.log('11');
            newDataId = 'CD00000001';
            console.log('12');
        }

        console.log('13');
        const sqlQueryInsert = `INSERT INTO CatDataInput (weekName, catId, dataId, userId, info, amount, dateInput) 
                                VALUES (@weekName, @catId, @dataId, @userId, @info, @amount, @dateInput)`;
        
        const request = connection.request();
        console.log('14');
        request.input("weekName", newCatDataInput.weekName);
        request.input("catId", newCatDataInput.catId);
        request.input("userId", newCatDataInput.userId);
        request.input("dataId", newDataId);
        request.input("info", newCatDataInput.info);
        request.input("amount", newCatDataInput.amount);
        request.input("dateInput", newCatDataInput.dateInput);
        console.log(newCatDataInput);
        console.log('15');
    
        const resultCheck = await request.query(sqlQueryCheck);
        console.log('16');
        const resultInsert = await request.query(sqlQueryInsert);
        console.log('17');
    
        connection.close();
        console.log('18');

        if (resultCheck.recordset.length != 0) {
            console.log('19');
            throw new Error('Matching CatWeek entry found for the provided dataId');
        }

        console.log('20');
        return this.getCatDataInputByIds(
            newCatDataInput.weekName,
            newCatDataInput.catId,
            newCatDataInput.userId,
            newDataId,
            newCatDataInput.info,
            newCatDataInput.amount,
            newCatDataInput.dateInput
        );
        console.log('21');
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