const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
  name: { type: String, required: true },
  description:{type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  imageUrl: {type: [String], required: true,},
  category: { type: String, required: true }
}, { timestamps: true });
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
module.exports = Product;