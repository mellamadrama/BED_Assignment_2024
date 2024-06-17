const Categories = require("../models/categories");

const getAllCategories = async (req, res) => {
    try {
      const categories = await Categories.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving categories");
    }
};

const getAllWeeks = async (req, res) => {
    try {
      const weeks = await Categories.getAllWeeks();
      res.json(weeks);
    } catch (error) { 
      console.error(error);
      res.status(500).send("Error retrieving weeks");
    }
  };

const getWeekByUserCatId = async (req, res) => {
    const catId = (req.params.catid);
    const userId = (req.params.userid);
    try {
      const week = await Categories.getWeekByUserCatId(catId, userId);
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
    const newWeek = req.body;
    try {
      const createdWeek = await Categories.createBook(newWeek);
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
  };