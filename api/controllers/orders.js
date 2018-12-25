const Order = require("../models/Order");
const Product = require("../models/Product");
exports.getall_orders = (req, res, next) => {
  Order.find()
    .populate("productId")
    .exec()
    .then(doc =>
      res.status(200).json({
        count: doc.length,
        orders: doc.map(doc => {
          return {
            _id: doc._id,
            quantity: doc.quantity,
            productId: doc.productId,
            request: {
              type: "GET",
              url: "http://localhost:3000/" + doc._id
            }
          };
        })
      })
    )
    .catch(err => res.status(500).json({ error: err }));
};

exports.post_order = (req, res, next) => {
  Product.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(500).json({ message: "Proudct Id not found" });
      }
      const order = new Order({
        productId: req.body.productId,
        quantity: req.body.quantity
      });
      return order.save();
    })
    .then(order => {
      res.status(201).json({
        message: "Order saved",
        orderCreated: order,
        request: {
          type: "GET",
          url: "http://localhost:3000/" + order._id
        }
      });
    })
    .catch(err => {
      res.status(404).json({ error: err });
    });
};

exports.get_order = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then(order => {
      if (!order) {
        res.status(500).json({ message: "Order not found" });
      }
      res.json({
        order: order,
        message: "Order fetched",
        request: {
          type: "GET",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
exports.delete_order = (req, res, next) => {
  const id = req.params.orderId;
  Order.findByIdAndDelete(req.params.orderId)
    .exec()
    .then(order => {
      res.json({
        message: "Order Deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/orders"
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
