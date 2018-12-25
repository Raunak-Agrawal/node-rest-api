const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  productImage: String
});

module.exports = mongoose.model("Product", productSchema);
