const Location = require("../models/location");

const getAllLocations = async (req, res) => {
    try {
        const locations = await Location.getAllLocations();
        res.json(locations);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error retrieving locations");
    }
};

const getLocationById = async(req, res) => {
    const locationReqId = req.params.locationReqId;

    try {
        const location = await Location.getLocationById(locationReqId);
        if (!location) {
            return res.status(404).send("Location not found");
        }
        res.json(location);
    } catch (error) {
        console.error("Error retrieving location:", error); // Debugging
        res.status(500).send("Error retrieving location");
    }
};


const createLocation = async (req, res) => {
    const locationName = req.body.name;
    try {
        // Check if location with the same name already exists
        const existingLocation = await Location.getLocationByName(locationName);

        if (existingLocation) {
            return res.status(400).json({
                status: 'error',
                message: 'Location already exists',
            });
        }

        const newLocationReqData = req.body;
        const userId = req.user.id;
        newLocationReqData.userId = userId;
        const newLocation = await Location.createLocation(newLocationReqData);
        res.status(201).json({
            status: 'success',
            data: newLocation
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create location',
            errors: [error.message]
        });
    }
};

const updateLocation = async (req, res) => {
    const locationReqId = req.params.locationReqId;
    const newLocationReqData = req.body;
    const adminId = req.user.id;
    newLocationReqData.adminId = adminId;


    try {
        const updatedLocation = await Location.updateLocation(locationReqId, newLocationReqData);
        if (!updatedLocation) {
            return res.status(404).send("Location not found");
        }
        res.json(updatedLocation);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating location");
    }
};


const deleteLocation = async (req, res) => {
    const locationReqId = parseInt(req.params.locationReqId); // Ensure parsing ID

    try {
        const success = await Location.deleteLocation(locationReqId);
        if (!success) {
            return res.status(404).send("Location not found");
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting location");
    }
};

module.exports = {
    getAllLocations,
    getLocationById,
    createLocation,
    updateLocation,
    deleteLocation,
}