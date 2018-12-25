const express = require("express");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");
const ProductController = require("../controllers/products");
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage });
const mongoose = require("mongoose");

//get products
router.get("/", ProductController.get_products);

//post products
router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  ProductController.post_product
);
//get product
router.get("/:productId", ProductController.get_product);
//delete product
router.delete("/:productId", checkAuth, ProductController.delete_product);
//patch product
router.put("/:productId", checkAuth, ProductController.update_product);

module.exports = router;
