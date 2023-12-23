const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Cart = require("../models/Cart");

const userSchema = joi.object({
  firstName: joi.string().required().min(2),
  lastName: joi.string().required().min(2),
  email: joi.string().required().email(),
  password: joi.string().required().min(8),
  isAdmin: joi.boolean().required(),
});

///Add user-register
router.post("/", async (req, res) => {
  try {
    ///1. joi validation
    const { error } = userSchema.validate(req.body);
    if (error) res.status(400).send(error);
    ///2. check if user already exist
    let user = await User.findOne({ email: req.body.email });
    if (user) res.status(400).send("User already exist");
    ///3.create the user
    user = new User(req.body);
    ///4.encrypt the password
    let salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    // 5. create user cart
    let cart = new Cart({ userId: user._id, products: [], active: true });
    await cart.save();

    ///create token and response
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.firstName,
        isAdmin: user.isAdmin,
      },
      process.env.jwtKey
    );
    ///return response
    res.status(201).send(token);
  } catch (error) {
    console.error("Error while saving user:", error);
    res.status(500).send("Internal Server Error");
    return;
    // Return to prevent further execution
  }
});
module.exports = router;
