const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: String,
  parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;