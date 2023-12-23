const express = require("express");
const router = express.Router();
const joi = require("joi");
const Product = require("../models/Product");
const auth = require("../middlewares/auth");

// Product Schema
const productSchema = joi.object({
  image: joi.string().required(),
  imageAlt: joi.string().required(),
  license: joi.string().required().min(2),
  name: joi.string().required().min(2),
  price: joi.number().required().min(2),
  description: joi.string().required().min(6),
  license: joi.string().required().min(2),
  inStock: joi.string().required(),
});

router.get("/search", async (req, res) => {
  const searchTerm = req.query.searchTerm;
  console.log("Received search request with searchTerm:", searchTerm);

  try {
    const products = await Product.find({
      name: { $regex: new RegExp(searchTerm, "i") },
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
router.get("/:license([a-zA-Z ]*)?", async (req, res) => {
  try {
    if (req.params.license) {
      // Get products by license
      let products = await Product.find({ license: req.params.license });
      if (!products || products.length === 0) {
        return res.status(404).send("No products found for the specified license.");
      }
      res.status(200).send(products);
    } else {
      // Get all products
      let allProducts = await Product.find();
      res.status(200).send(allProducts);
    }
  } catch (error) {
    console.error("Error in finding products:", error);
    res.status(500).send("Internal server error in finding products.");
  }
});

//////Add product
router.post("/", auth, async (req, res) => {
  try {
    ///check if not admin or business user
    const isAdmin = req.payload.isAdmin;
    if (!isAdmin) return res.status(400).send("You are not authorized");
    //  joi validation for body
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send("productSchema error");
    let newProduct = await Product.findOne({
      name: req.body.name,
      description: req.body.description,
    });
    if (newProduct) return res.status(400).send("Card already exist");

    newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).send("Product added");
  } catch (error) {
    res.status(400).send(error);
  }
});

////get product by id-no need for Authorization

router.get("/:_id", async (req, res) => {
  try {
    const product = await Product.findById(req.params._id);
    if (!product) return res.status(400).send("No such product");
    res.status(200).send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

///update product by admin

router.put("/:_id", auth, async (req, res) => {
  try {
    ////check if admin
    if (!req.payload.isAdmin)
      return res.status(401).send("You are not authorized to update this product");
    ///joi validation
    const { error } = productSchema.validate(req.body);
    if (error) return res.status(400).send(error);
    ////find Product
    let productToUpdate = await Product.findById(req.params._id);
    if (!productToUpdate) return res.status(400).send("No such Product");

    ///find Product again and update
    await Product.findOneAndUpdate(
      { _id: req.params._id },

      req.body,

      { new: true }
    );
    res.status(201).send("Product updated");
  } catch (error) {
    console.error(error);
    res.status(400).send("catch error");
  }
});

module.exports = router;
