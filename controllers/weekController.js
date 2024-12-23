const Week = require("../models/week");
const DataInput = require("../models/dataInput");
const sql = require("mssql");

const getAllWeeks = async (req, res) => {
    try {
      const weeks = await Week.getAllWeeks();
      res.json(weeks);
    } catch (error) { 
      console.error(error);
      res.status(500).send("Error retrieving weeks");
    }
  };

const getWeekByUserCatId = async (req, res) => {
    const catId = req.params.catId;
    const userId = req.user.id;
    try {
      const week = await Week.getWeekByUserCatId(catId, userId);
      if (!week) {
        return res.status(404).send("Week not found");
      }
      res.json(week);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving week");
    }
};

const createWeek = async (req, res) => {
    const newWeekData = {
        weekName: req.body.weekName,
        catId: req.body.catId,
        userId: req.body.userId,
    };
    const userId = req.user.id;
    newWeekData.userId = userId;
    try {
        const createdWeek = await Week.createWeek(newWeekData);
        if (!createdWeek) {
            return res.status(409).send("Week already exists");
        }
        res.status(201).json(createdWeek);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating week");
    }
};

const updateWeekName = async (req, res) => {
  const weekName = req.body.weekName;
  const catId = req.body.catId;
  const userId = req.user.id;
  const newWeekName = req.body.newWeekName;

  try {
      const updatedWeekName = await Week.updateWeekName(weekName, catId, userId, newWeekName);
      if (!updatedWeekName) {
          return res.status(404).send("Week not found");
      }
      res.json(updatedWeekName);
  } catch (error) {
      console.error(error);
      return res.status(500).send("Error updating week name");
  }
};

const updateWeekAndData = async (req, res) => {
    const weekName = req.body.weekName;
    const catId = req.body.catId;
    const userId = req.user.id;
    const newWeekName = req.body.newWeekName;

    try {
      // Check if there are data inputs for the week
      const hasDataInputs = await DataInput.hasDataInputs(weekName, catId, userId);

      if (hasDataInputs) {
        // Create new week
      await Week.createWeek({ weekName: newWeekName, catId, userId });

      // Update all data inputs for the week
      await DataInput.updateAllCatDataInput(weekName, catId, userId, newWeekName);

      // Delete the old week
      await Week.deleteWeek(weekName, catId, userId);
      } else {
        // If no data inputs found, just update the week name
        await Week.updateWeekName(weekName, catId, userId, newWeekName);
      }
      

      res.status(200).send("Week and related data updated successfully");
  } catch (error) {
      console.error("Error updating week and related data:", error);
      res.status(500).send("Error updating week and related data");
  }
};

const deleteWeek = async (req, res) => {
    const weekName = req.params.weekName;
    const catId = req.params.catId;
    const userId = req.user.id;
  
    try {
      const success = await Week.deleteWeek(weekName, catId, userId);
      if (!success) {
        return res.status(404).send("Week not found");
      }
      else {
        return res.status(200).send("Week deleted successfully");
      }
      return res.status(204).send();
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error deleting week");
    }
};

const deleteWeekAndData = async (req, res) => {
  const weekName = req.params.weekName;
  const catId = req.params.catId;
  const userId = req.user.id;

  try {
      // Check if there are data inputs for the week
      const hasDataInputs = await DataInput.hasDataInputs(weekName, catId, userId);
      
      if (hasDataInputs) {
        // First, delete all data inputs for the week
        const deleteDataInputs = await DataInput.deleteCatDataInputs(weekName, catId, userId);
        if (!deleteDataInputs) {
            return res.status(500).send("Failed to delete related data inputs");
        }

        // Then, delete the week itself
        const success = await Week.deleteWeek(weekName, catId, userId);
        if (!success) {
            return res.status(404).send("Week not found");
        }

        res.status(200).send("Week and related data deleted successfully");
    } else {
        // If no data inputs found, just delete the week
        const success = await Week.deleteWeek(weekName, catId, userId);
        if (!success) {
            return res.status(404).send("Week not found");
        }

        res.status(200).send("Week deleted successfully");
    }
} catch (error) {
    console.error(error);
    res.status(500).send("Error deleting week and related data");
}
};

module.exports = {
    getAllWeeks,
    getWeekByUserCatId,
    createWeek,
    updateWeekName,
    deleteWeek,
    deleteWeekAndData,
    updateWeekAndData,
  };