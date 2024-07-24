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
    const weekName = req.params.weekName;
    const catId = req.params.catId;
    const userId = req.user.id;
    const dataId = req.params.dataId;
    try {
      const catDataInput = await DataInput.getCatDataInputByIds(weekName, catId, userId, dataId);
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
    const userId = req.user.id;

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
        userId: req.user.id,
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
    const weekName = req.params.weekName;
    const catId = req.params.catId;
    const userId = req.user.id;
    const dataId = req.params.dataId;
    const updatedData = req.body;
  
    try {
      const updatedCatDataInput = await DataInput.updateCatDataInput(weekName, catId, userId, dataId, updatedData);
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
    const userId = req.user.id;
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
    const userId = req.user.id;
    const catId = req.params.catId;
    const dataId = req.params.dataId;
    const weekName = req.params.weekName;
  
    try {
      const success = await DataInput.deleteCatDataInput(userId, catId, dataId, weekName);
      if (!success) {
        return res.status(404).send("Data not found");
      }
      else {
        return res.status(200).send("Data deleted successfully");
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send("Error deleting data");
    }
  };

  const deleteCatDataInputs = async (req, res) => {
    const weekName = req.params.weekName;
    const catId = req.params.catId;
    const userId = req.user.id;
  
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