const express = require('express')
const app = express()
const port = 8000
const cors = require('cors');
require('dotenv').config()
const UserRoute = require('./routes/user');
const dbConnect = require('./database/connection');

dbConnect()

app.use(express.json())
app.use(cors())
app.use(UserRoute)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)});