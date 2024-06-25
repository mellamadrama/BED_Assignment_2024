const mPoint = require("../models/monthlypoints");

const getAllMonthlyPoints = async (req, res) => {
    try {
        const points = await mPoint.getAllMonthlyPoints();
        res.json(points);
    } catch(error) {
        console.error(error);
        req.status(500).send("Error retrieving challenges");
    }
};

const resetMonthlyPoints = async (res, req) => {
    try {
        const reset = await mPoint.resetMonthlyPoints();
        if (!reset) {
            return res.status(404).send("Unable to reset monthly points");
        }
        res.json(reset);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error resetting monthly points");
    }
};

const getUserMonthlyPoints = async (res, req) => {
    try {
        const user = await mPoint.getUserMonthlyPoints();
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
    getAllMonthlyPoints,
    resetMonthlyPoints,
    getUserMonthlyPoints,
};