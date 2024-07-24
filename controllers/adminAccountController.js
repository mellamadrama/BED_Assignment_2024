const Admin = require("../models/adminAccount");

const getAllAdmins = async (req, res) => {
    try{
        const admins = await Admin.getAllAdmins();
        if (!admins) {
            return res.status(404).send("Unable to get admin");
        }
        res.json(admins);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting admin");
    }
};

const getAllAdminsById = async (req, res) => {
    const adminId = req.user.id;

    try {
        const admin = await Admin.getAllAdminsById(adminId);
        if (!admin) {
            return res.status(404).send("Unable to get admin");
        }
        res.json(admin);
        return admin;
    } catch (error) {
        console.error(error);
        res.status(500).send("Error getting admin");
    }
};


const updateAdminAccount = async (req, res) => {
    const adminId = req.user.id;
    const { username, firstName, lastName, email, password } = req.body.newAdminData;

    try {
        const updatedAdmin = await Admin.updateAdminAccount(adminId, username, firstName, lastName, email, password);
        if (!updatedAdmin) {
            return res.status(404).send("Admin not found");
        }
        res.json(updatedAdmin);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating admin");
    }
};

const deleteAdminAccount = async (req, res) => {
    const adminId = req.user.id;

    try {
        await Admin.deleteAdminAccount(adminId);
        res.status(200).send("Account deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting account");
    }
}


module.exports = {
    getAllAdmins,
    getAllAdminsById,
    updateAdminAccount,
    deleteAdminAccount
};