const express = require("express");
const categoryController = require("./controllers/categoryController");
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
app.get("/categories", categoryController.getAllCategories);
app.get("/weeks", categoryController.getAllWeeks);
app.get("/week/:userid/:catid", categoryController.getWeekByUserCatId);
app.post("/week", categoryController.createWeek);
app.put("/week/:userid/:catid/:weekName", categoryController.updateWeekName);
app.get("/catdatainput", categoryController.getAllCatDataInput);
app.get("/catdatainput/:userId/:catId/:dataId/:weekName", categoryController.getCatDataInputByIds);
app.post("/catdatainput", categoryController.createCatDataInput);
app.put("/catdatainput/:userId/:catId/:dataId/:weekNam", categoryController.updateCatDataInput);
app.delete('/week/:weekName/:catId/:userId', categoryController.deleteWeek);
app.delete('/catdatainput/:dataId/:catId/:weekName/:userId', categoryController.deleteCatDataInput);


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