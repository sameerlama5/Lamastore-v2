const express = require('express');
const { register, login, addToCart } = require('../controllers/user');
const router = express.Router();

router.post('/register',register)
router.post('/login',login)
router.post('/cart', addToCart)
module.exports = router;