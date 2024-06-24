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

const getCategoryByName = async (req, res) => {
  const catName = req.params.catName;
  try {
      const category = await Category.getCategoryByName(catName);
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
    getCategoryByName,
};