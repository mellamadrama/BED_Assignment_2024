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
          (row) => new Categories(row.catId, row.catName)
        );
    }

    static async getCategoryById(catId) {
        const connection = await sql.connect(dbConfig);

        const sqlQuery = `SELECT * FROM Category WHERE catId = @catId`;

        const request = connection.request();
        request.input("catId", catId);
        const result = await request.query(sqlQuery);

        connection.close();

        return result.recordset[0]
        ? new Categories(
            result.recordset[0].catId,
            result.recordset[0].catName
        )
        : null;
    }
}

module.exports = Categories;