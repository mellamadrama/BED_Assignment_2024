// controllers/loginController.js
const userModel = require("../models/userModel");

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userModel.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(400).send("Invalid username or password");
    }
    res.send("Login successful");
  } catch (err) {
    res.status(500).send("Server error");
  }
}

module.exports = {
  loginUser
};
