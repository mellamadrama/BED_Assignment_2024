const Category = require("../models/category");

const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving categories");
    }
};

const getAllWeeks = async (req, res) => {
    try {
      const weeks = await Category.getAllWeeks();
      res.json(weeks);
    } catch (error) { 
      console.error(error);
      res.status(500).send("Error retrieving weeks");
    }
  };

const getWeekByUserCatId = async (req, res) => {
    const catId = req.params.catId;
    const userId = req.params.userId;
    try {
      const week = await Category.getWeekByUserCatId(catId, userId);
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
        userId: req.body.userId
    };
    try {
        const createdWeek = await Category.createWeek(newWeekData);
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
  const catId = req.params.catid;
  const userId = req.params.userid;
  const weekName = req.params.weekName;
  const newWeekName = req.body;

  try {
    const updatedWeekName = await Category.updateWeekName(catId, userId, weekName, newWeekName);
    if (!updateWeekName) {
      return res.status(404).send("Week not found");
    }
    res.json(updatedWeekName);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating week name");
  }
};

const getAllCatDataInput = async (req, res) => {
  try {
    const catDataInputs = await Category.getAllCatDataInput();
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
    const catDataInput = await Category.getCatDataInputByIds(userId, catId, dataId, weekName);
    if (!catDataInput) {
      return res.status(404).send("Data not found");
    }
    res.json(catDataInput);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving Data");
  }
};

const createCatDataInput = async (req, res) => {
  const newCatDataInput = {
      weekName: req.body,
      catId: req.body,
      userId: req.body,
      info: req.body,
      amount: req.body,
      dateInput: req.body
  };
  try {
      const createdCatDataInput = await Category.createCatDataInput(newCatDataInput);
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
    const updatedCatDataInput = await Category.updateCatDataInput(dataId, catId, weekName, userId, updatedData);
    if (!updatedCatDataInput) {
      return res.status(404).send("Data not found");
    }
    res.json(updatedCatDataInput);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating data info, amount and date");
  }
};

module.exports = {
    getAllCategories,
    getAllWeeks,
    getWeekByUserCatId,
    createWeek,
    updateWeekName,
    getAllCatDataInput,
    getCatDataInputByIds,
    createCatDataInput,
    updateCatDataInput,
  };