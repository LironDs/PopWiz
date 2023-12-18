const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
});

const Cart = mongoose.model("Carts", cartSchema);

module.exports = Cart;
