const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const Cart = require("../models/Cart");
const Product = require("../models/Product");

////update cart
router.post("/", auth, async (req, res) => {
  try {
    ///Check if user have cart array
    let userCart = await Cart.findOne({ userId: req.payload._id });
    if (!userCart)
      res.status(400).json({
        status: "error",
        action: "add",
        message: "No user Cart",
      });
    ///check if product is in cart
    let productIndex = userCart.products.indexOf(req.body._id);

    // If product is in cart, remove it
    if (productIndex !== -1) {
      userCart.products.splice(productIndex, 1);
      await userCart.save();
      return res.status(200).json({
        status: "success",
        action: "remove",
        message: "Product removed from cart",
      });

      ////if it isn't-add it
    } else {
      userCart.products.push(req.body._id);
      await userCart.save();
      return res.status(201).json({
        status: "success",
        action: "add",
        message: "Product added to Carts",
      });
    }
  } catch (error) {
    return res.status(400).json({
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
    // console.log(req.payload._id);
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
