const express = require('express');
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/product');
const upload = require('../middleware/imageHandler');
const { uploadController } = require('../controllers/image');
const router = express.Router();
// Product routes
router.post('/product', createProduct);
router.get('/product', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', updateProduct);
router.delete('/product/:id', deleteProduct);
router.post('/uploadproduct', upload.single('product'), uploadController);

module.exports = router;
