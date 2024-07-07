const express = require("express");
const categoryController = require("./controllers/categoryController");
const weekController = require("./controllers/weekController");
const dataInputController = require("./controllers/dataInputController");
const locationController = require("./controllers/locationController");
const loginController = require("./controllers/loginController");
const adminLoginController = require("./controllers/adminLoginController")
const challengeController = require("./controllers/challengeController");
const weeklyPointsController = require("./controllers/weeklyPointsController");
const monthlyPointsController = require("./controllers/monthlyPointsController");
const userAccController = require("./controllers/userAccController");

const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");

const { validateWeek, validateUpdateWeekName } = require('./middlewares/validateWeek');
const { validateDataInput, validateDataInputs } = require('./middlewares/validateDataInput');
const validateLocation = require('./middlewares/validateLocation');
const validateLogin = require("./middlewares/validateLogin");
const validateAdminLogin = require("./middlewares/validateAdminLogin")
const validateChallenge = require('./middlewares/validateChallenge');
const validatePoints = require("./middlewares/validatePoints");
const validateUserAccount = require("./middlewares/validateUserAccount");

const app = express();
const port = process.env.PORT || 3000;
const staticMiddleware = express.static("public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(staticMiddleware);

//login
app.post('/login', validateLogin, loginController.loginUser);
app.post('/loginAdmin', validateAdminLogin, adminLoginController.loginAdmin);

// categories
app.get("/categories", categoryController.getAllCategories);
app.get('/categories/:catId', categoryController.getCategoryById);

// weeks
app.get("/weeks", weekController.getAllWeeks);
app.get("/weeks/:catId/:userId", weekController.getWeekByUserCatId);
app.post("/weeks", validateWeek, weekController.createWeek);
app.put("/weeks/:weekName/:catId/:userId", validateUpdateWeekName, weekController.updateWeekAndData);
app.delete('/weeks/:weekName/:catId/:userId', weekController.deleteWeekAndData);

// datainput
app.get("/datainput", dataInputController.getAllCatDataInput);
app.get("/datainput/:weekName/:catId/:userId/:dataId", dataInputController.getCatDataInputByIds);
app.get("/datainput/:weekName/:catId/:userId", dataInputController.getCatDataInputById);
app.post("/datainput", validateDataInput, dataInputController.createDataInput);
app.put("/datainput/:weekName/:catId/:userId/:dataId", validateDataInputs, dataInputController.updateCatDataInput);
app.delete('/datainput/:weekName/:catId/:userId/:dataId', dataInputController.deleteCatDataInput);

// locations
app.get("/locations", locationController.getAllLocations);
app.get("/locations/:locationReqId", locationController.getLocationById);
app.post("/createlocations", validateLocation, locationController.createLocation);
app.put("/updlocations/:locationReqId", validateLocation, locationController.updateLocation);
app.delete("/dellocations/:locationReqId", locationController.deleteLocation);

// challenge
app.get("/challenges", challengeController.getAllChallenges);
app.get("/challenges/:userId", challengeController.getAllChallengesByUserID);
app.get("/challenges/:challengeID/:userId", challengeController.getAllChallengesByChallengeID);
app.put("/updatechallenges/:challengeID/:userId", challengeController.updateChallengeCompleted);

// points
app.get("/weeklypoints", weeklyPointsController.getAllWeeklyPoints);
app.get("/monthlypoints", monthlyPointsController.getAllMonthlyPoints);
app.put("/resetweekly", weeklyPointsController.resetWeeklyPoints);
app.put("/resetmonthly", monthlyPointsController.resetMonthlyPoints);
app.put("/userweeklypoints/:userId", weeklyPointsController.getUserWeeklyPoints);
app.put("/usermonthlypoints/:userId", monthlyPointsController.getUserMonthlyPoints);

// account
app.get("/getuser", userAccController.getAllUsersById);
app.get("/getuser/:userId", userAccController.getAllUsersById);
app.put("/updateuser/:userId", userAccController.updateUserAccount);
app.put("/updateusername/:userId", userAccController.updateUsername);
app.put("/updatefirstname/:firstName/:userId", userAccController.updateFirstname);
app.put("/updatelastname/:lastName/:userId", userAccController.updateLastname);
app.put("/updateemail/:email/:userId", userAccController.updateEmail);

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
