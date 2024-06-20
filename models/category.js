const sql = require("mssql");
const dbConfig = require("../dbConfig");

class Categories {
    constructor(catId, catName) {
        this.catId = catId;
        this.catName = catName;
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
}

module.exports = Categories;