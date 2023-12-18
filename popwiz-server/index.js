const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const register = require("./routes/register");
const login = require("./routes/login");
const products = require("./routes/products");
// const categories = require("./routes/category");
const users = require("./routes/users");
const cart = require("./routes/cart");

const app = express();
const port = process.env.PORT || 10001;
mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cors());

app.use("/api/register", register);
app.use("/api/login", login);
app.use("/api/products", products);
app.use("/api/users", users);
app.use("/api/cart", cart);
// app.use("/api/categories", categories);

app.listen(port, () => console.log("server started at port: ", port));
