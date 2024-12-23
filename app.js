const express = require("express");
const categoryController = require("./controllers/categoryController");
const weekController = require("./controllers/weekController");
const dataInputController = require("./controllers/dataInputController");
const locationController = require("./controllers/locationController");
const eventController = require("./controllers/eventController");
const loginController = require("./controllers/loginController");
const adminLoginController = require("./controllers/adminLoginController")
const challengeController = require("./controllers/challengeController");
const userWeeklyChallengeController = require("./controllers/userChallengeController");
const weeklyPointsController = require("./controllers/weeklyPointsController");
const monthlyPointsController = require("./controllers/monthlyPointsController");
const userAccController = require("./controllers/userAccController");
const userSignupController = require("./controllers/userSignupController");
const adminSignupController = require("./controllers/adminSignupController");
const adminAccountController = require("./controllers/adminAccountController");
const userLocationController = require("./controllers/userLocationController");
const userTrackerController = require("./controllers/userTrackerController");
const adminHistoryController = require("./controllers/adminHistoryController");
const chatHistoryController = require("./controllers/chatHistoryController");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json"); // Import generated spec

const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");

const { validateWeek, validateUpdateWeekName } = require('./middlewares/validateWeek');
const { validateDataInput, validateDataInputs } = require('./middlewares/validateDataInput');
const validateLocation = require('./middlewares/validateLocation');
const validateEvent = require('./middlewares/validateEvent');
const validateLogin = require("./middlewares/validateLogin");
const validateUserSignup = require('./middlewares/validateUserSignup');
const validateAdminLogin = require("./middlewares/validateAdminLogin");
const validateChallenge = require('./middlewares/validateChallenge');
const validatePoints = require("./middlewares/validatePoints");
const validateUserAccount = require("./middlewares/validateUserAccount");
const validateAdminSignup = require("./middlewares/validateAdminSignup");
const validateAdminAccount = require("./middlewares/validateAdminAccount");
const validateUserLocation = require("./middlewares/validateUserLocation");
const validateUserTracker = require("./middlewares/validateUserTracker");
const validateAdminHistory = require("./middlewares/validateAdminHistory");
const validateSaveChat = require("./middlewares/validateChatHistory");

const verifyJWT = require("./middlewares/verifyJWT");


const app = express();
const port = process.env.PORT || 3000;
const staticMiddleware = express.static("public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(staticMiddleware);

//login done by Rena (S10258053C)
app.post('/login', validateLogin, loginController.loginUser);
app.post('/loginAdmin', validateAdminLogin, adminLoginController.loginAdmin);

//signup done by Rena (S10258053C)
app.post('/signup', validateUserSignup, userSignupController.createUserAccount);
app.post('/adminsignup', validateAdminSignup, adminSignupController.createAdminAccount);

// categories done by Charlotte (S10258027K)
app.get("/categories", verifyJWT, categoryController.getAllCategories);
app.get('/categories/:catId', verifyJWT, categoryController.getCategoryById);

// weeks done by Charlotte (S10258027K)
app.get("/weeks", verifyJWT, weekController.getAllWeeks);
app.get("/weeks/:catId/:userId", verifyJWT, weekController.getWeekByUserCatId);
app.post("/weeks", verifyJWT, validateWeek, weekController.createWeek);
app.put("/weeks/:weekName/:catId/:userId", verifyJWT, validateUpdateWeekName, weekController.updateWeekAndData);
app.delete('/weeks/:weekName/:catId/:userId', verifyJWT, weekController.deleteWeekAndData);

// datainput done by Charlotte (S10258027K)
app.get("/datainput", verifyJWT, dataInputController.getAllCatDataInput);
app.get("/datainput/:weekName/:catId/:userId/:dataId", verifyJWT, dataInputController.getCatDataInputByIds);
app.get("/datainput/:weekName/:catId/:userId", verifyJWT, dataInputController.getCatDataInputById);
app.post("/datainput", verifyJWT, validateDataInput, dataInputController.createDataInput);
app.put("/datainput/:weekName/:catId/:userId/:dataId", verifyJWT, validateDataInputs, dataInputController.updateCatDataInput);
app.delete('/datainput/:weekName/:catId/:userId/:dataId', verifyJWT, dataInputController.deleteCatDataInput);

//chat bot done by Charlotte (S10258027K)
app.get("/chathistory/:userId", verifyJWT, chatHistoryController.getChatByUserId);
app.post("/chathistory", verifyJWT, validateSaveChat, chatHistoryController.saveChat);
app.post('/generate-text', verifyJWT, chatHistoryController.generateGeminiResponse);

// Serve the Swagger UI at a specific route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// locations done by Isabelle (S10257093F)
app.get("/locations", verifyJWT, locationController.getAllLocations);
app.get("/locations/:locationReqId", verifyJWT, locationController.getLocationById);
app.post("/createlocations", verifyJWT, validateLocation, locationController.createLocation);
app.put("/updlocations/:locationReqId", verifyJWT, validateLocation, locationController.updateLocation);
app.delete("/dellocations/:locationReqId", verifyJWT, locationController.deleteLocation);

//events done by Isabelle (S10257093F)
app.get("/events", verifyJWT, eventController.getAllEvents);
app.get("/events/:eventId", verifyJWT, eventController.getEventById);
app.post("/createevents", verifyJWT, validateEvent, eventController.createEvent);
app.put("/updateevents/:eventId", verifyJWT, validateEvent, eventController.updateEvent);
app.delete("/deleteevents/:eventId", verifyJWT, eventController.deleteEvent);

// challenges done by Rithika (S10257149F)
app.get("/challenges", verifyJWT, challengeController.getAllChallenges);
app.get("/challenges/:id", verifyJWT, challengeController.getChallengeByID);
app.post("/createchallenges", verifyJWT, validateChallenge, challengeController.createChallenge);
app.delete("/challenges/:id", verifyJWT, challengeController.deleteChallenge);

// user weekly challenges done by Rithika (S10257149F)
app.get("/userchallenges/:userId", verifyJWT, userWeeklyChallengeController.getAllChallengesByUserID);
app.put("/updateuserchallenges/:challengeId/:userId", verifyJWT, userWeeklyChallengeController.updateChallengeCompleted);
app.delete("/deleteuserchallenges/:challengeId", verifyJWT, userWeeklyChallengeController.deleteChallengeForEachUser);
app.post("/createuserchallenges", verifyJWT, userWeeklyChallengeController.createChallengeForEachUser);

// points done by Rithika (S10257149F)
app.get("/weeklypoints", verifyJWT, weeklyPointsController.getAllWeeklyPoints);
app.get("/monthlypoints", verifyJWT, monthlyPointsController.getAllMonthlyPoints);
app.put("/resetweekly", verifyJWT, weeklyPointsController.resetWeeklyPoints);
app.put("/resetmonthly", verifyJWT, monthlyPointsController.resetMonthlyPoints);
app.put("/addweekly/:userId", verifyJWT, weeklyPointsController.addPointsToWeekly);
app.put("/addmonthly/:userId", verifyJWT, monthlyPointsController.addPointsToMonthly);
app.get("/userweeklypoints/:userId", verifyJWT, weeklyPointsController.getUserWeeklyPoints);
app.get("/usermonthlypoints/:userId", verifyJWT, monthlyPointsController.getUserMonthlyPoints);

// user account done by Rena (S10258053C)
app.get("/getuser", verifyJWT, userAccController.getAllUsers);
app.get("/getuser/:userId", verifyJWT, userAccController.getAllUsersById);
app.put("/updateuser/:userId", verifyJWT, userAccController.updateUserAccount);
app.delete("/deleteuser/:userId", verifyJWT, userAccController.deleteUserAccount);

// user history (request location) done by Rena (S10258053C)
app.get("/userlocations", verifyJWT, userLocationController.getAllLocations);
app.get("/userlocation/:userId", verifyJWT, userLocationController.getLocationByUserId);
app.get("/usertracker", verifyJWT, userTrackerController.getAllCategories)
app.get("/usertracker/:userId", verifyJWT, userTrackerController.getCatDataInputByUserId)

// admin account done by Rena (S10258053C)
app.get("/getadmin", verifyJWT, adminAccountController.getAllAdmins);
app.get("/getadmin/:adminId", verifyJWT, adminAccountController.getAllAdminsById);
app.put("/updateadmin/:adminId", verifyJWT, adminAccountController.updateAdminAccount);
app.delete("/deleteadmin/:adminId", verifyJWT, adminAccountController.deleteAdminAccount);
app.get("/adminhistory/:adminId", verifyJWT, adminHistoryController.getApprovedLocationsByAdminId);

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
