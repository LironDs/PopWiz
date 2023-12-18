const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  imageAlt: {
    type: String,
    required: true,
  },
  license: {
    type: String,
    required: true,
    minlength: 2,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  price: {
    type: Number,
    required: true,
    minlength: 2,
  },
  description: {
    type: String,
    required: true,
    minlength: 6,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
  },

  inStock: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
