const express = require("express");
const mobileLoginController = require("./mobileLoginControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/Seamless/MobileLogin")
  .post(userController.protect, mobileLoginController.mobileLogin);

module.exports = router;
