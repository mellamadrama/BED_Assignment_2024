const User = require("../models/usersignup");
const bcrypt = require("bcryptjs");

const createUserAccount = async (req, res) => {
    const userDetails = {
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userDetails.password, salt);
    userDetails.password = hashedPassword;

    try {
        const newUser = await User.createUserAccount(userDetails);
        res.status(201).send("User account created successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating user account");
    }
};

module.exports = {
    createUserAccount
};
