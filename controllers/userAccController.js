const User = require("../models/userAccount");

const getAllUsers = async (req, res) => {
    try{
        const users = await User.getAllUsers();
        if (!users) {
            return res.status(404).send("Unable to get user");
        }
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user");
    }
};

const getAllUsersById = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.getAllUsersById(userId);
        if (!user) {
            return res.status(404).send("Unable to get user");
        }
        res.json(user);
        return user;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user");
    }
};


const updateUsername = async (req, res) => {
    const userId = req.params.userId;
    const username = req.params.username;

    try {
        const updatedUsername = await User.updateUsername(userId, username);
        if (!updatedUsername) {
            return res.status(404).send("Data not found");
        }
        res.json(updatedUsername);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating username");
    }
};

const updateFirstname = async (req, res) => {
    const userId = req.params.userId;
    const firstName = req.params.firstName;
    const newFirstname = req.body.newFirstname;

    try {
        const updatedFirstname = await User.updateFirstname(userId, firstName, newFirstname);
        if (!updatedFirstname) {
            return res.status(404).send("Data not found");
        }
        res.json(updatedFirstname);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating first name");
    }
};

const updateLastname = async (req, res) => {
    const userId = req.params.userId;
    const lastName = req.params.lastName;
    const newLastname = req.body.newLastname;

    try {
        const updatedLastname = await User.updateLastname(userId, lastName, newLastname);
        if (!updatedLastname) {
            return res.status(404).send("Data not found");
        }
        res.json(updatedLastname);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating last name");
    }
};

const updateEmail = async (req, res) => {
    const userId = req.params.userId;
    const email = req.params.email;
    const newEmail = req.body.newEmail;

    try {
        const updatedEmail = await User.updateEmail(userId, email, newEmail);
        if (!updatedEmail) {
            return res.status(404).send("Data not found");
        }
        res.json(updatedEmail);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating email address");
    }
};

module.exports = {
    getAllUsers,
    getAllUsersById,
    updateUsername,
    updateFirstname,
    updateLastname,
    updateEmail
};