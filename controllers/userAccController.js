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

const updateUserAccount = async(req, res) => {
    const userId = req.params.userId;
    const newUserData = req.body;

    try {
        const updatedUser = await User.updatedUser(userId, newUserData);
        if (!updatedUser) {
            return res.status(404).send("Location not found");
        }
        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user");
    }
};

module.exports = {
    getAllUsers,
    getAllUsersById,
    updateUserAccount,
}