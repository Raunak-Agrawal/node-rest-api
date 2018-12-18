const express = require("express");
const router = express.Router();

//get orders
router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "GET request to /orders"
  });
});

//post orders
router.post("/", (req, res, next) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  };
  res.status(201).json({
    message: "POST request to /orders",
    orderCreated: order
  });
});
//get order
router.get("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: "GET request to /order",
    id: id
  });
});
//delete product
router.delete("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  res.status(200).json({
    message: "DELETE request to /order",
    id: id
  });
});

module.exports = router;
