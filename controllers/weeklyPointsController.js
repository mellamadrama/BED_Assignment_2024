const WeeklyPoints = require("../models/weeklypoints");

const getAllWeeklyPoints = async (req, res) => {
    try {
        const points = await WeeklyPoints.getAllWeeklyPoints();
        res.json(points);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving challenges"); 
    }
};

const resetWeeklyPoints = async (req, res) => {
    try {
        const reset = await WeeklyPoints.resetWeeklyPoints();
        if (!reset) {
            return res.status(404).send("Unable to reset weekly points");
        }
        res.json(reset);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error resetting weekly points");
    }
};

const getUserWeeklyPoints = async (req, res) => {
    try {
        const user = await WeeklyPoints.getUserWeeklyPoints();
        if (!user) {
            return res.status(404).send("Unable to get user");
        }
        res.json(user); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting points");
    }
};

module.exports = {
    getAllWeeklyPoints,
    resetWeeklyPoints,
    getUserWeeklyPoints,
};
