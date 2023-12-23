const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const Cart = require("../models/Cart");
const Product = require("../models/Product");

////update cart
router.post("/", auth, async (req, res) => {
  try {
    /// Check if user has a cart array
    let userCart = await Cart.findOne({ userId: req.payload._id });
    if (!userCart) {
      return res.status(400).json({
        status: "error",
        action: "add",
        message: "No user Cart",
      });
    }

    /// Check if the product is in the cart
    let productIndex = userCart.products.indexOf(req.body._id);

    // If the product is in the cart, remove it
    if (productIndex !== -1) {
      userCart.products.splice(productIndex, 1);
      await userCart.save();
      return res.status(200).json({
        status: "success",
        action: "remove",
        message: "Product removed from cart",
      });
    }

    //// If it isn't, add it
    userCart.products.push(req.body._id);
    await userCart.save();
    return res.status(201).json({
      status: "success",
      action: "add",
      message: "Product added to Carts",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return res.status(500).json({
      status: "error",
      action: "unknown",
      message: "An error occurred",
    });
  }
});

///get user cart by userId
router.get("/", auth, async (req, res) => {
  try {
    ///check if id match
    let userCart = await Cart.findOne({ userId: req.payload._id });
    if (!userCart) return res.status(400).send("user not found");

    let productsInCart = userCart.products;

    const products = await Product.find({ _id: { $in: productsInCart } });

    res.status(200).send(products);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
