const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../../models/Product");
//get products
router.get("/", (req, res, next) => {
  Product.find()
    .select("name price _id")
    .exec()
    .then(doc => {
      const response = {
        count: doc.length,
        products: doc.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/products/" + doc._id
            }
          };
        })
      };
      res.status(200).json(response);
      // if (doc.length > 0) {

      // } else {
      //   res.status(404).json({ message: "No entries found" });
      // }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

//post products
router.post("/", (req, res, next) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price
  });
  product
    .save()
    .then(res => {
      console.log(res);
      res.status(200).json({
        message: "Created product success",
        productCreated: {
          name: res.name,
          price: res.price,
          _id: res._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + res._id
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
//get product
router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid entry found " });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});
//delete product
router.delete("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findOneAndRemove({ _id: id })
    .exec()
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json({ error: err }));
});
//patch product
router.put("/:productId", (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const opr of req.body) {
    updateOps[opr.propName] = opr.value;
  }
  Product.findOneAndUpdate({ _id: id }, { $set: updateOps })
    .exec()
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
