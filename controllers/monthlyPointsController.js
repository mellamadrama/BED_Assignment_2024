const MonthlyPoints = require("../models/monthlypoints");

const getAllMonthlyPoints = async (req, res) => {
    try {
        const points = await MonthlyPoints.getAllMonthlyPoints();
        res.json(points);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error retrieving monthly points");
    }
};

const resetMonthlyPoints = async (req, res) => {
    try {
        const reset = await MonthlyPoints.resetMonthlyPoints();
        if (!reset) {
            return res.status(404).json({ message: "Unable to reset monthly points" });
        }
        res.json({ message: "Monthly points reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error resetting monthly points" });
    }
};

const getUserMonthlyPoints = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await MonthlyPoints.getUserMonthlyPoints(userId);
        if (!user) {
            return res.status(404).json({ message: "Unable to get user's monthly points" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting user's monthly points" });
    }
};

const addPointsToMonthly = async (req, res) => {
    try {
        const { points } = req.body;
        const userId = req.user.id;

        if (!points || isNaN(points)) {
            return res.status(400).json({ message: "Invalid points value" });
        }

        const success = await MonthlyPoints.addPointsToMonthly(points, userId);
        if (!success) {
            return res.status(404).json({ message: "Unable to add points to monthly total" });
        }
        res.json({ message: "Points added to monthly total successfully" });
    } catch (error) {
        console.error("Error adding points to monthly total:", error);
        res.status(500).json({ message: "Error adding points to monthly total" });
    }
};

module.exports = {
    getAllMonthlyPoints,
    resetMonthlyPoints,
    getUserMonthlyPoints,
    addPointsToMonthly,
};


