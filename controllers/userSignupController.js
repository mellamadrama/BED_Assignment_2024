const User = require("../models/usersignup");

const createUserAccount = async (req, res) => {
    const userDetails = {
        userId: req.body.userId,
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    };

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
}