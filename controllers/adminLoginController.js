const Account = require('../models/adminLogin');

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const account = await Account.getAdminByUsernameAndPassword(username, password);
    
    if (account) {
      res.json({ adminId: account.adminId, message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error("Error logging in: ", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  loginAdmin,
};