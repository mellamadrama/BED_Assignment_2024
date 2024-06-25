const userModel = require("../models/login");

async function loginUser(req, res) {
  const { username, password } = req.body;

  try {
    const user = await userModel.getUserByUsername(username);
    if (!user) {
      return res.status(400).json({ success: false, message: "Username does not exist" });
    }
    if (user.password !== password) {
      return res.status(400).json({ success: false, message: "Password incorrect" });
    }
    res.json({ success: true, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}

module.exports = {
  loginUser
};
