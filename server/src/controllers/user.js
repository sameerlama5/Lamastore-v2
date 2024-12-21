const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const Product = require("../models/product");
const User = require("../models/user");

const register = async (req, res) => {
  const emailExist = await User.exists({ email: req.body.email });
  if (emailExist) return res.status(409).send({ msg: "Email already exists" });
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  User.create(req.body);
  res.send({ msg: req.body.name + "Created successfully" });
}
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).send({ msg: "Invalid email!!" });
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched)
    return res.status(401).send({ msg: "Invalid Password!!" });

  const token = jwt.sign({ email }, process.env.SECRET_KEY);
  res.send({
    token,
    user,
    isLoggednIn: true,
    msg: "Authorized!!",
  });
}


const addToCart = async (req, res) => {
  const { userId, productId } = req.body;
  console.log(req.body)

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the product by productId
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Add the product to the user's cart if it's not already there
    if (!user.cart.includes(productId)) {
      user.cart.push(productId);
      await user.save(); // Save the updated user document
      return res.status(200).json({ message: 'Product added to cart' });
    } else {
      return res.status(400).json({ message: 'Product is already in the cart' });
    }

  } catch (error) {
    console.error('Error adding to cart:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// get user
const getAllUser = async (req, res) => {
  const data = await User.find();
  res.send(data);
}
//approve user
const approveUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.isVrified = true;
  user.save();
  res.send("user approved");
};

//reject user
const rejectUser = async (req, res) => {
  const user = await User.findById(req.params.userId);
  user.isVrified = false;
  user.save();
  res.send("user approved");
};
module.exports = { login, register, getAllUser, approveUser, rejectUser, addToCart };