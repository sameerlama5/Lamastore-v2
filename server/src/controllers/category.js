const Category = require("../models/category");

//category controllers
const createCategory = async (req, res) => {
    try {
      const category = new Category(req.body);
      await category.save();
      if (req.body.parent) {
        await Category.findByIdAndUpdate(req.body.parent, {
          $push: { subcategories: category._id }
        });
      }
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const getAllCategories = async (req, res) => {
    try {
      const categories = await Category.find().populate('subcategories');
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getCategoryById = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id).populate('subcategories');
      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const updateCategory = async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!category) return res.status(404).json({ message: 'Category not found' });
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  
  const deleteCategory = async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      if (!category) return res.status(404).json({ message: 'Category not found' });
  
      // Remove this category from its parent's subcategories
      if (category.parent) {
        await Category.findByIdAndUpdate(category.parent, {
          $pull: { subcategories: category._id }
        });
      }
  
      // Update products that use this category
      await Product.updateMany({ category: category._id }, { category: null });
  
      // Delete the category
      await Category.findByIdAndDelete(req.params.id);
  
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  module.exports = { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory };