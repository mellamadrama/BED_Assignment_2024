const Category = require("../models/userTracker");

const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving categories");
    }
};

const getCatDataInputByUserId = async (req, res) => {
  const userId = req.user.id;
  try {
      const category = await Category.getCatDataInputByUserId(userId);
      if (!category) {
          return res.status(404).send("Category not found");
      }
      res.json(category);
  } catch (error) {
      console.error(error);
      res.status(500).send("Error retrieving category");
  }
};

module.exports = {
    getAllCategories,
    getCatDataInputByUserId,
};