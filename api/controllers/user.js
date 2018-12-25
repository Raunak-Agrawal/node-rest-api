const User = require("../models/User");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

exports.user_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "mail exists" });
      } else {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
              return res.status(500).json({ error: err });
            } else {
              var newUser = new User({
                email: req.body.email,
                password: hash
              });
              newUser
                .save()
                .then(result => {
                  console.log(result);
                  res.status(200).json({ message: "User created" + result });
                })
                .catch(err => {
                  res.status(500).json({ error: err });
                });
            }
          });
        });
      }
    });
};
exports.user_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      } else {
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          if (err) {
            return res.status(401).json({
              message: "Auth failed"
            });
          } else {
            const token = jwt.sign(
              {
                email: user[0].email,
                userId: user[0]._id
              },
              "secret",
              { expiresIn: "1h" }
            );

            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
