const Product = require("../models/product");

//product controlller
const createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({message: error.message});
  }
};
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message: 'Product not found'});
    res.json(product);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct };