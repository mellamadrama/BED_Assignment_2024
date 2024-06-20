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

module.exports = {
    getAllCategories,
  };