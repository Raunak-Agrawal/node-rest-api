const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");
const OrderControllers = require("../controllers/orders");
//get orders
router.get("/", checkAuth, OrderControllers.getall_orders);

//post orders
router.post("/", checkAuth, OrderControllers.post_order);
//get order
router.get("/:orderId", checkAuth, OrderControllers.get_order);
//delete order
router.delete("/:orderId", checkAuth, OrderControllers.delete_order);

module.exports = router;
