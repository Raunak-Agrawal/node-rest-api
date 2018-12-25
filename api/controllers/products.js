const Product = require("../models/Product");
exports.get_products = (req, res, next) => {
  Product.find()
    .select("name price _id productImage")
    .exec()
    .then(doc => {
      const response = {
        count: doc.length,
        products: doc.map(doc => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            productImage: doc.productImage,
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
};

exports.post_product = (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    productImage: req.file.path
  });
  product
    .save()
    .then(result => {
      console.log(res);
      res.status(200).json({
        message: "Created product success",
        productCreated: {
          name: result.name,
          price: result.price,
          _id: result._id,
          productImage: result.productImage,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id
          }
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
exports.get_product = (req, res, next) => {
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
};
exports.delete_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findOneAndDelete({ _id: id })
    .exec()
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json({ error: err }));
};
exports.update_product = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const opr of req.body) {
    updateOps[opr.propName] = opr.value;
  }
  Product.findOneAndUpdate({ _id: id }, { $set: updateOps })
    .exec()
    .then(res => res.status(200).json(res))
    .catch(err => res.status(500).json({ error: err }));
};
