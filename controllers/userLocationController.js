const Location = require("../models/userLocation");

const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.getAllLocations();
        res.json(locations);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error retrieving locations");
    }
};

const getLocationByUserId = async(req, res) => {
    const userId = req.params.userId;
    if (!userId) {
        console.log('Error getting userId')
    }

    try {
        const location = await Location.getLocationByUserId(userId);
        if (!location) {
            return res.status(404).send("Location not found");
        }
        res.json(location);
    } catch (error) {
        console.error("Error retrieving location:", error); // Debugging
        res.status(500).send("Error retrieving location");
    }
};

module.exports = {
    getAllLocations,
    getLocationByUserId
}