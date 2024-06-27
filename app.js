const express = require("express");
const categoryController = require("./controllers/categoryController");
const weekController = require("./controllers/weekController");
const dataInputController = require("./controllers/dataInputController");
const locationController = require("./controllers/locationController");
const loginController = require("./controllers/loginController");
const challengeController = require("./controllers/challengeController");
const weeklyPointsController = require("./controllers/weeklyPointsController");
const monthlyPointsController = require("./controllers/monthlyPointsController");
const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");
const { validateWeek, validateUpdateWeekName } = require('./middlewares/validateWeek');
const validateDataInput = require('./middlewares/validateDataInput');
const validateLocation = require('./middlewares/validateLocation');
const validateLogin = require('./middlewares/validateLogin');
const validateChallenge = require('./middlewares/validateChallenge');
const validatePoints = require("./middlewares/validatePoints");
const app = express();
const port = process.env.PORT || 3000;
const staticMiddleware = express.static("public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(staticMiddleware);

// categories
app.get("/categories", categoryController.getAllCategories);
app.get('/categories/:catId', categoryController.getCategoryById);

// weeks
app.get("/weeks", weekController.getAllWeeks);
app.get("/weeks/:catId/:userId", weekController.getWeekByUserCatId);
app.post("/weeks", validateWeek, weekController.createWeek);
app.put("/weeks/:weekName/:catId/:userId", validateUpdateWeekName, weekController.updateWeekName);
app.delete('/weeks/:weekName/:catId/:userId', weekController.deleteWeekAndData);

// datainput
app.get("/datainput", dataInputController.getAllCatDataInput);
app.get("/datainput/:dataId/:catId/:weekName/:userId", dataInputController.getCatDataInputByIds);
app.post("/datainput", validateDataInput, dataInputController.createDataInput);
app.put("/datainput/:dataId/:catId/:weekName/:userId", validateDataInput, dataInputController.updateCatDataInput);
app.delete('/datainput/:userId/:catId/:dataId/:weekName', dataInputController.deleteCatDataInput);


// locations
app.get("/locations", locationController.getAllLocations);
app.get("/locations/:locationReqId", locationController.getLocationById);
app.post("/createlocations", validateLocation, locationController.createLocation);
app.put("/updlocations/:locationReqId", validateLocation, locationController.updateLocation);
app.delete("/dellocations/:locationReqId", locationController.deleteLocation);

// login
app.post("/login", loginController.loginUser);

// challenge
app.get("/challenges", challengeController.getAllChallenges);
app.get("/challenges/:challengeID/:userId", challengeController.getAllChallengesByUserID);
app.put("/updatechallenges/:challengeID/:userId", challengeController.updateChallengeCompleted);

// points
app.get("/weeklypoints", weeklyPointsController.getAllWeeklyPoints);
app.get("/monthlypoints", monthlyPointsController.getAllMonthlyPoints);
app.put("/resetweekly", weeklyPointsController.resetWeeklyPoints);
app.put("/resetmonthly", monthlyPointsController.resetMonthlyPoints);
app.put("/userweeklypoints/:userId", weeklyPointsController.getUserWeeklyPoints);
app.put("/usermonthlypoints/:userId", monthlyPointsController.getUserMonthlyPoints);

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
