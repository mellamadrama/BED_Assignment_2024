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

    //create
    static async createWeek(newWeek) {
        const connection = await sql.connect(dbConfig);
    
        const sqlQuery = `INSERT INTO CatWeek (weekName, catId, dataId, userId) VALUES (@title, @author); SELECT SCOPE_IDENTITY() AS id;`; // Retrieve ID of inserted record
    
        const request = connection.request();
        request.input("title", newBookData.title);
        request.input("author", newBookData.author);
    
        const result = await request.query(sqlQuery);
    
        connection.close();
    
        // Retrieve the newly created book using its ID
        return this.getBookById(result.recordset[0].id);
    }

    //update
    
    //delete
}