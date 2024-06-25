const Point = require("../models/points");

const getAllWeeklyPoints = async (req, res) => {
    try {
        const points = await Point.getAllWeeklyPoints();
        res.json(points);
    } catch(error) {
        console.error(error);
        req.status(500).send("Error retrieving challenges");
    }
};

const getAllMonthlyPoints = async (req, res) => {
    try {
        const points = await Point.getAllMonthlyPoints();
        res.json(points);
    } catch(error) {
        console.error(error);
        req.status(500).send("Error retrieving challenges");
    }
};

const resetWeeklyPoints = async (res, req) => {
    try {
        const reset = await Challenge.resetWeeklyPoints();
        if (!reset) {
            return res.status(404).send("Unable to reset weekly points");
        }
        res.json(reset);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error resetting weekly points");
    }
};

const resetMonthlyPoints = async (res, req) => {
    try {
        const reset = await Challenge.resetMonthlyPoints();
        if (!reset) {
            return res.status(404).send("Unable to reset monthly points");
        }
        res.json(reset);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error resetting monthly points");
    }
};

module.exports = {
    getAllWeeklyPoints,
    getAllMonthlyPoints,
    resetWeeklyPoints,
    resetMonthlyPoints,
};