const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const loginSchema = joi.object({
  firstName: joi.string().min(2),
  lastName: joi.string().min(2),
  email: joi.string().required().email(),
  password: joi.string().required().min(8),
  isAdmin: joi.boolean(),
});

router.post("/", async (req, res) => {
  try {
    ////1.joi validation
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).send("error in schema");
    ////2.check if user doesn't(!!!) exist (its faster)
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("wrong email or password");
    ////3. check if email fit pass-compare
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) return res.status(400).send("Wrong email or password");
    ///4.create token & return response with token
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.firstName,
        isAdmin: user.isAdmin,
      },
      process.env.jwtKey
    );
    res.status(200).send(token);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
