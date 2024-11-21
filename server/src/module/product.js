const { Schema } = mongoose;
// - email
// - phoneNumber
// - password
// - role
// - fullName
// - address
const productSchema = new Schema({
  Name: String,
  image: String,
  price: Number,
  description: String,
  category: String,
  quantity: Number,
  soldQuantity: Number,
  rating: Number,
});
const Product = mongoose.model("User", productSchema); 
module.exports = Product;