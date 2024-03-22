
const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Customer = require('../models/custmrModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      email: req.body.email,
      username: req.body.username,
      password: hashedPass,
    });

    const user = await newUser.save();
     const newCusDetails = new Customer({
      userId: user._id,
      customerName: req.body.username,
      customerEmail: req.body.email,
    });
    const customer = await newCusDetails.save();
    const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' })
    res.json({ token })
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' })
      const customer = await Customer.findOne({ userId: user._id });
      if (!customer) {
        return res.status(404).json({ message: "Customer details not found" });
      }
      res.json({ token, user, customer });
    } else {
      res.status(404).json({ message: "User Credential not found,SignUp and agin login" })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server err" })
  }
})

module.exports = router;
