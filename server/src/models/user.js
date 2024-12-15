const mongoose = require("mongoose");
const { Schema } = mongoose;
// - email
// - phoneNumber
// - password
// - fullName
// - address
const userSchema = new Schema({
  email: String,
  phoneNumber: Number,
  password: String,
  fullName: String,
  address: String,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});
const User = mongoose.model("User", userSchema);
module.exports = User;
