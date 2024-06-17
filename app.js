const express = require("express");
const categoriescontroller = require("./controllers/categoriescontroller");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");
const validateCategory = require('./middlewares/validateCategory')

const app = express();
const port = process.env.PORT || 3000;
const staticMiddleware = express.static("public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(staticMiddleware);

//categories
app.get("/categories", categoriescontroller.getAllCategories);
app.get("/weeks", categoriescontroller.getAllWeeks);
app.get("/week/:userid/:catid", categoriescontroller.getWeekByUserCatId);

app.listen(port, async () => {
    try {
      await sql.connect(dbConfig);
      console.log("Database connection established successfully");
    } catch (err) {
      console.error("Database connection error:", err);
      process.exit(1); 
    }
    console.log(`Server listening on port ${port}`);
});
  
process.on("SIGINT", async () => {
    console.log("Server is gracefully shutting down");
    await sql.close();
    console.log("Database connection closed");
    process.exit(0);
});