const express = require("express");
const bookController = require("./controllers/bookController");
const authController = require("./controllers/authController");

const sql = require("mssql");
const dbConfig = require("./dbConfig");
const bodyParser = require("body-parser");

const validateBook = require("./middlewares/validateBook");
const validateUser = require("./middlewares/validateUser");
const validateLogin = require("./middlewares/validateLogin");

const app = express();
const port = process.env.PORT || 3000;
const staticMiddleware = express.static("public");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(staticMiddleware);

//book
app.get("/books", bookController.getAllBooks);
app.put("/books/:bookId/availability", validateBook, bookController.updateBook);

//user
app.post("/register", validateUser, authController.registerUser);
app.post("/login", validateLogin, authController.login);

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
  
