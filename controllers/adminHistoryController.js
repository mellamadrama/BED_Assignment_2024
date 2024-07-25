const Location = require("../models/adminHistory"); 

const getApprovedLocationsByAdminId = async (req, res) => {
    const adminId = req.user.id;
    console.log(adminId);

    try {
        const locations = await Location.getApprovedLocationsByAdminId(adminId);
        console.log(locations);
        if (!locations || locations.length === 0) {
            return res.status(404).send("No approved locations found");
        }
        res.json(locations);
    } catch (error) {
        console.error("Error retrieving approved locations:", error); 
        res.status(500).send("Error retrieving approved locations");
    }
};

module.exports = {
    getApprovedLocationsByAdminId
};
