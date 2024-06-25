const wPoint = require("../models/weeklypoints");

const getAllWeeklyPoints = async (req, res) => {
    try {
        const points = await wPoint.getAllWeeklyPoints();
        res.json(points);
    } catch(error) {
        console.error(error);
        req.status(500).send("Error retrieving challenges");
    }
};

const resetWeeklyPoints = async (res, req) => {
    try {
        const reset = await wPoint.resetWeeklyPoints();
        if (!reset) {
            return res.status(404).send("Unable to reset weekly points");
        }
        res.json(reset);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error resetting weekly points");
    }
};

const getUserWeeklyPoints = async (res, req) => {
    try {
        const user = await wPoint.getUserWeeklyPoints();
        if (!user) {
            return res.status(404).send("Unable to get user");
        }
        res.json(reset);
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