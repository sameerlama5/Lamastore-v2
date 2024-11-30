const express = require('express')
const app = express()
const port = 8000
const cors = require('cors');
require('dotenv').config()
const ProductRout = require('./routes/product')
const UserRoute = require('./routes/user');
const dbConnect = require('./database/connection');
dbConnect()
app.use(express.json())
app.use(cors())
app.use(UserRoute)
app.use(ProductRout)
app.use('/images', express.static('upload'));

app.listen(port, () => {
  console.log(`app listening on port ${port}`)});