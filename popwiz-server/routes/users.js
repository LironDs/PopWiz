const express = require("express");
const router = express.Router();
const joi = require("joi");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const auth = require("../middlewares/auth");

const userSchema = joi.object({
  firstName: joi.string().required().min(2),
  lastName: joi.string().required().min(2),
  email: joi.string().required().email(),
  password: joi.string().required().min(8),
});

///get user by _id
router.get("/:_id", auth, async (req, res) => {
  try {
    // Check if user is authorized to update the userProfile
    if (!(req.payload._id === req.params._id || req.payload.isAdmin)) {
      return res.status(403).send("Permission denied");
    }
    ////2. check user details
    const user = await User.findById(req.params._id);
    if (!user) return res.status(400).send("No such user");

    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

///edit userProfile by user or Admin
router.put("/:_id", auth, async (req, res) => {
  try {
    // joi validation for body
    const { error } = userSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    let userToUpdate = await User.findById(req.params._id);

    ///check if user exist
    if (!userToUpdate) {
      res.status(400).send("No such user");
    }
    // Check if user is authorized to update the userProfile
    if (!(req.payload._id === req.params._id || req.payload.isAdmin)) {
      return res.status(403).send("Permission denied");
    }

    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (error) {
        console.error("Error hashing password:", error);
        return res.status(500).send("Internal Server Error");
      }
    }
    userToUpdate = await User.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true });
    res.status(200).send(userToUpdate);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get all users
router.get("/", auth, async (req, res) => {
  try {
    const checkUser = req.payload.role;
    if (!checkUser === "admin") return res.status(400).send("You are not authorized");
    let users = await User.find();
    if (!users) return res.status(400).send("No users");
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
});

////delete user by admin
router.delete("/:_id", auth, async (req, res) => {
  try {
    ///check if admin
    const checkAdmin = req.payload.isAdmin;
    if (!checkAdmin) return res.status(403).send("You are not authorized");
    ///check if user exist
    const userToDelete = await User.findByIdAndDelete({
      _id: req.params._id,
    });
    if (!userToDelete) return res.status(400).send("No such user");
    res.status(200).send("user removed");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
