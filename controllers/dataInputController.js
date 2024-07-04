const DataInput = require("../models/dataInput");

const getAllCatDataInput = async (req, res) => {
    try {
      const catDataInputs = await DataInput.getAllCatDataInput();
      res.json(catDataInputs);
    } catch (error) { 
      console.error(error);
      res.status(500).send("Error retrieving catDataInput");
    }
  };
  
  const getCatDataInputByIds = async (req, res) => {
    const catId = req.params.catId;
    const userId = req.params.userId;
    const dataId = req.params.dataId;
    const weekName = req.params.weekName;
    try {
      const catDataInput = await DataInput.getCatDataInputByIds(userId, catId, dataId, weekName);
      if (!catDataInput) {
        return res.status(404).send("Data not found");
      }
      res.json(catDataInput);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving Data");
    }
  };

  const getCatDataInputById = async (req, res) => {
    const weekName = req.params.weekName;
    const catId = req.params.catId;
    const userId = req.params.userId;

    try {
      const catDataInput = await DataInput.getCatDataInputById(weekName, catId, userId);
      if (!catDataInput) {
        return res.status(404).send("Data not found");
      }
      res.json(catDataInput);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving Data");
    }
  };
  
  const createDataInput = async (req, res) => {
    const newCatDataInput = {
        weekName: req.body.weekName,
        catId: req.body.catId,
        userId: req.body.userId,
        info: req.body.info,
        amount: req.body.amount,
        dateInput: req.body.dateInput
    };
    try {
        const createdCatDataInput = await DataInput.createDataInput(newCatDataInput);
        if (!createdCatDataInput) {
            return res.status(409).send("Data already exists");
        }
        res.status(201).json(createdCatDataInput);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating data");
    }
  };
  
  const updateCatDataInput = async (req, res) => {
    const catId = req.params;
    const userId = req.params;
    const dataId = req.params;
    const weekName = req.params;
    const updatedData = req.body;
  
    try {
      const updatedCatDataInput = await DataInput.updateCatDataInput(dataId, catId, weekName, userId, updatedData);
      if (!updatedCatDataInput) {
        return res.status(404).send("Data not found");
      }
      res.json(updatedCatDataInput);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating data info, amount and date");
    }
  };

  const updateAllCatDataInput = async (req, res) => {
    const weekName = req.params.weekName;
    const catId = req.params.catId;
    const userId = req.params.userId;
    const newWeekName = req.params.newWeekName;
  
    try {
      const updatedCatDataInput = await DataInput.updateAllCatDataInput(weekName, catId, userId, newWeekName);
      if (!updatedCatDataInput) {
        return res.status(404).send("Data not found");
      }
      res.json(updatedCatDataInput);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating data info, amount and date");
    }
  }
  
  const deleteCatDataInput = async (req, res) => {
    const userId = req.params.userId;
    const catId = req.params.catId;
    const dataId = req.params.dataId;
    const weekName = req.params.weekName;
  
    try {
      const success = await DataInput.deleteCatDataInput(userId, catId, dataId, weekName);
      if (!success) {
        return res.status(404).send("Data not found");
      }
      else {
        res.status(200).send("Data deleted successfully");
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting data");
    }
  };

  const deleteCatDataInputs = async (req, res) => {
    const weekName = req.params.weekName;
    const catId = req.params.catId;
    const userId = req.params.userId;
  
    try {
      const success = await DataInput.deleteCatDataInputs(weekName, catId, userId);
      if (!success) {
        return res.status(404).send("Data not found");
      }
      else {
        res.status(200).send("Data deleted successfully");
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting data");
    }
  }

module.exports = {
    getAllCatDataInput,
    getCatDataInputByIds,
    createDataInput,
    updateCatDataInput,
    deleteCatDataInput,
    deleteCatDataInputs,
    updateAllCatDataInput,
    getCatDataInputById,
};