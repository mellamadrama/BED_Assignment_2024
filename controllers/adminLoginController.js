const Account = require('../models/adminLogin');
//const bcrypt = require("bcryptjs");

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.getAdminByUsernameAndPassword(username, password);
    //const isMatch = bcrypt.compare(password, account.password);
    
    if (account != null) {
      //console.log(req.user.adminId, account);
      res.json({ adminId: account.adminId, message: 'Login successful!' });
      const payload = {
        id: user.id,
        role: "Admin",
      };
      const token = jwt.sign(payload, "your_secret_key", { expiresIn: 3600 });
      console.log(token);
      res.status(200).json({ token });
      //  else {
      //   res.status(403).send("Forbidden")
      // }
      //if (isMatch) {
      //} else {
        //return res.status(401).json({ message: 'Invalid username or password' });
      //}
    } else {
      return res.status(401).json({ message: 'Invalid username or password or not a valid admin account' });
    }
    
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  loginAdmin,
};