const express = require("express");
const categoryController = require("./controllers/categoryController");
const weekController = require("./controllers/weekController");
const dataInputController = require("./controllers/dataInputController");
const locationController = require("./controllers/locationController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");
const validateWeek = require('./middlewares/validateWeek');
const validateDataInput = require('./middlewares/validateDataInput');
const validateLocation = require('./middlewares/validateLocation');

const app = express();
const port = process.env.PORT || 3000;
const staticMiddleware = express.static("public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(staticMiddleware);

//categories
app.get("/categories", categoryController.getAllCategories);

//weeks
app.get("/weeks", weekController.getAllWeeks);
app.get("/weeks/:userid/:catid", weekController.getWeekByUserCatId);
app.post("/weeks", validateWeek, weekController.createWeek);
app.put("/weeks/:userid/:catid/:weekName", validateWeek, weekController.updateWeekName);
app.delete('/weeks/:weekName/:catId/:userId', weekController.deleteWeek);

//datainput
app.get("/datainput", dataInputController.getAllCatDataInput);
app.get("/datainput/:userId/:catId/:dataId/:weekName", dataInputController.getCatDataInputByIds);
app.post("/datainput", validateDataInput, dataInputController.createCatDataInput);
app.put("/datainput/:userId/:catId/:dataId/:weekNam", validateDataInput, dataInputController.updateCatDataInput);
app.delete('/datainput/:dataId/:catId/:weekName/:userId', dataInputController.deleteCatDataInput);


//locations
app.get("/locations", locationController.getAllLocations); //get all locations
app.get("/locations/:locationReqId", locationController.getLocationById); //get location by id
app.post("/locations", validateLocation, locationController.createLocation); //create location
app.put("/locations/:locationReqId", validateLocation, locationController.updateLocation); //update location
app.delete("/locations/:locationReqId", locationController.deleteLocation); //delete location

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