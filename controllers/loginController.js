const Account = require('../models/login');
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.getUserByUsernameAndPassword(username, password);
    
    if (account != null) {
      //console.log(req.user.adminId, account);
      const payload = {
        id: account.userId,
        role: "User",
      };
      const token = jwt.sign(payload, "your_secret_key", { expiresIn: 3600 });
      console.log(token);
      res.status(200).json({ token });
      return;
      //  else {
      //   res.status(403).send("Forbidden")
      // }
      //if (isMatch) {
      //} else {
        //return res.status(401).json({ message: 'Invalid username or password' });
      //}
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