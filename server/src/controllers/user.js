const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
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
module.exports = { login, register, getAllUser, approveUser, rejectUser };