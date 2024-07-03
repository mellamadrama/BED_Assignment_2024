const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.getUserByUsername(username);
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const payload = {
      id: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, "your_secret_key", { expiresIn: "3600s" }); // Expires in 1 hour

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = login;  