const Admin = require("../models/adminSignup");
const bcrypt = require("bcryptjs");

const createAdminAccount = async (req, res) => {
    const adminDetails = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminDetails.password, salt);
    adminDetails.password = hashedPassword;

    try {
        const newAdmin = await Admin.createAdminAccount(adminDetails);
        res.status(201).send("Admin account created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating admin account");
    }
};

module.exports = {
    createAdminAccount,
}
