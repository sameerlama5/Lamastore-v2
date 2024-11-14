const express = require("express");
const app = express();
const port = 8000;
const mongoose = require("mongoose");
const cor = require("cors");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const dbConnect = async () => {
  try {
    const isConnected = await mongoose.connect(
      "mongodb://127.0.0.1:27017/lamastoreDb"
    );
    if (isConnected) console.log("Connected to MongoDB");
  } catch (err) {
    console.log(err);
  }
};
dbConnect();
const { Schema } = mongoose;
// - email
// - phoneNumber
// - password
// - role
// - fullName
// - address
const productSchema = new Schema({
  email: String,
  phoneNumber: Number,
  password: String,
  role: {
    type: String,
    enum: ["admin", "vendor", "user"],
    default: "admin",
  },
  fullName: String,
  address: String,
});
const Product = mongoose.model("product", productSchema);
app.use(express.json());
app.use(cor());

app.post("/register", async (req, res) => {
  const emailExist = await Product.exists({ email: req.body.email });
  if (emailExist) return res.status(409).send({ msg: "Email already exists" });

  req.body.password = await bcrypt.hash(req.body.password, saltRounds);

  Product.create(req.body);
  res.send({ msg: req.body.role + "Created successfully" });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
