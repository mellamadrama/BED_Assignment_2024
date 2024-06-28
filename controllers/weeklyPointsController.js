const WeeklyPoints = require("../models/weeklypoints");

const getAllWeeklyPoints = async (req, res) => {
    try {
        const points = await WeeklyPoints.getAllWeeklyPoints();
        res.json(points);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving weekly points");
    }
};

const resetWeeklyPoints = async (req, res) => {
    try {
        const reset = await WeeklyPoints.resetWeeklyPoints();
        if (!reset) {
            return res.status(404).json({ message: "Unable to get reset user points" });
        }
        res.json({ message: "Weekly points reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error resetting weekly points" });
    }
};

const getUserWeeklyPoints = async (req, res) => {
    try {
        const user = await WeeklyPoints.getUserWeeklyPoints(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "Unable to get user points" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting user points" });
    }
};

module.exports = {
    getAllWeeklyPoints,
    resetWeeklyPoints,
    getUserWeeklyPoints,
};
