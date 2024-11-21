const mongoose = require('mongoose');
const { Schema } = mongoose;
// - email
// - phoneNumber
// - password
// - role
// - fullName
// - address
const userSchema = new Schema({
  email: String,
  phoneNumber: Number,
  password: String,
  role: {
    type: String,
    enum: ["vendor", "user"],
    default: "user",
  },
  fullName: String,
  address: String,
});
const User = mongoose.model("User", userSchema); 
module.exports = User;