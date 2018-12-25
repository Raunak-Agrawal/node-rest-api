const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user");

//user sign up
router.post("/signup", UserController.user_signup);

//user login
router.post("/login", UserController.user_login);

module.exports = router;
