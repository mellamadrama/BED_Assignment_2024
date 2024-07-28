const Account = require('../models/login');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.getUserByUsername(username);
    const isMatch = await bcrypt.compare(password, account.password);
    
    if (!isMatch) {
      return res.status(401).json({message: "Invalid credentials"})
    };
    
    if (account != null) {
      const payload = {
        id: account.userId,
        role: "User",
      };
      const token = jwt.sign(payload, "your_secret_key", { expiresIn: 3600 });
      res.status(200).json({ token });
      return;

    } else {
      res.status(401).json({ message: 'Invalid username or password or invalid user account' });
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  loginUser,
};