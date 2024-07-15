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
    console.log("Received locationReqId:", locationReqId); // Debugging

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

        const newLocation = await Location.createLocation(req.body);
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

    try {
        const updatedLocation = await Location.updateLocation(locationReqId, newLocationReqData);
        if (!updatedLocation) {
            return res.status(404).send("Location not found");
        }
        res.json(updatedLocation);
    } catch (error) {
        console.error("Error updating location:", error);
        res.status(500).send("Error updating location");
    }
};


const deleteLocation = async(req, res) => {
    const locationId = parseInt(req.params.id);

    try {
        const success = await Location.deleteLocation(locationId);
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