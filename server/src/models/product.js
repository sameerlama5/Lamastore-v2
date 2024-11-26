const mongoose = require('mongoose');
const { Schema } = mongoose;
const productSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  imageUrl: {type: String, required: true,},
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true }
}, { timestamps: true });
const Product = mongoose.model("Product", productSchema); 
module.exports = Product;