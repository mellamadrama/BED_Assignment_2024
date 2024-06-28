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
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting user");
    }
};

module.exports = {
    getAllUsers,
    getAllUsersById,
}