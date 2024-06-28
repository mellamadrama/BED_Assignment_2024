const MonthlyPoints = require("../models/monthlypoints");

const getAllMonthlyPoints = async (req, res) => {
    try {
        const points = await MonthlyPoints.getAllMonthlyPoints();
        res.json(points);
    } catch(error) {
        console.error(error);
        res.status(500).send("WHY ERROR");
    }
};

const resetMonthlyPoints = async (req, res) => {
    try {
        const reset = await MonthlyPoints.resetMonthlyPoints();
        if (!reset) {
            return res.status(404).json({ message: "Unable to get reset user points" });
        }
        res.json({ message: "Monthly points reset successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error resetting monthly points" });
    }
};

const getUserMonthlyPoints = async (req, res) => {
    try {
        const user = await MonthlyPoints.getUserMonthlyPoints();
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


