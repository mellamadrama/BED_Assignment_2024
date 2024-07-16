const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Data {
    constructor(weekName, catId, userId, dataId, info, amount, dateInput, catName) {
        this.weekName = weekName;
        this.catId = catId;
        this.userId = userId;
        this.dataId = dataId;
        this.info = info;
        this.amount = amount;
        this.dateInput = dateInput;
        this.catName = catName;
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

    static async getCatDataInputByUserId(userId) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `
        SELECT 
            CW.weekName, 
            CD.info, 
            CD.amount, 
            CD.dateInput,
            C.catName
        FROM 
            CatDataInput CD
        INNER JOIN 
            CatWeek CW ON CD.weekName = CW.weekName AND CD.catId = CW.catId AND CD.userId = CW.userId
        INNER JOIN 
            Category C ON CW.catId = C.catId
        WHERE 
            CD.userId = @userId;
        `;

        const request = connection.request();
        request.input("userId", userId);

        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset.map(
            (row) => new Data(row.weekName, row.catId, row.userId, row.dataId, row.info, row.amount, row.dateInput, row.catName)
        );
    }
}

module.exports = Data;