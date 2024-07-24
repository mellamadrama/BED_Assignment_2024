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
    const userId = req.user.id;

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


const updateUserAccount = async (req, res) => {
    const userId = req.user.id;
    const { username, firstName, lastName, email, password } = req.body.newUserData;

    try {
        const updatedUser = await User.updateUserAccount(userId, username, firstName, lastName, email, password);
        if (!updatedUser) {
            return res.status(404).send("User not found");
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user");
    }
};

const deleteUserAccount = async (req, res) => {
    const userId = req.user.id;

    try {
        await User.deleteUserAccount(userId);
        res.status(200).send("Account deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting account");
    }
}


module.exports = {
    getAllUsers,
    getAllUsersById,
    updateUserAccount,
    deleteUserAccount
};