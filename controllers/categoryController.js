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

const getCategoryById = async (req, res) => {
  const catId = req.params.catId;
  try {
      const category = await Category.getCategoryById(catId);
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
    getCategoryById,
};