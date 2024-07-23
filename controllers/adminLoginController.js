const Account = require('../models/adminLogin');
//const bcrypt = require("bcryptjs");

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log("bleh")
    const account = await Account.getAdminByUsernameAndPassword(username, password);
    //const isMatch = bcrypt.compare(password, account.password);
    
    if (account) {
      console.log(req.user.id, account)
      if (req.user.id === account.adminId) {
        res.json({ adminId: account.adminId, message: 'Login successful!' });
      } else {
        res.status(403).send("Forbidden")
      }
      //if (isMatch) {
      //} else {
        //return res.status(401).json({ message: 'Invalid username or password' });
      //}
    } else {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const payload = {
      adminId: account.adminId, 
    }
    
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  loginAdmin,
};