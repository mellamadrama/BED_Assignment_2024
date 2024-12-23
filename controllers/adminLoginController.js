const Account = require('../models/adminLogin');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.getAdminByUsername(username);
    const isMatch = bcrypt.compare(password, account.password);
    
    if (!isMatch) {
      return res.status(401).json({message: "Invalid credentials"})
    };

    if (account != null) {
      const payload = {
        id: account.adminId,
        role: "Admin",
      };
      const token = jwt.sign(payload, "your_secret_key", { expiresIn: 3600 });
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ message: 'Invalid username or password or not a valid admin account' });
    }
    
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send("Internal Server Error");
    return;
  }
};

module.exports = {
  loginAdmin,
};