const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const User = require("../module/user");


const register = async (req, res) => {
  const emailExist = await User.exists({ email: req.body.email });
  if (emailExist) return res.status(409).send({ msg: "Email already exists" });
  req.body.password = await bcrypt.hash(req.body.password, saltRounds);
  User.create(req.body);
  res.send({ msg: req.body.role + "Created successfully" });
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

module.exports = { login, register };