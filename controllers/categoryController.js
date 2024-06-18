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
    const catId = req.params.catid;
    const userId = req.params.userid;
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

module.exports = {
    getAllCategories,
    getAllWeeks,
    getWeekByUserCatId,
    createWeek,
  };