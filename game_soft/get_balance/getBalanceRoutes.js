const express = require("express");
const getBalanceControllers = require("./getBalanceControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/Seamless/GetBalance")
  .post(userController.protect, getBalanceControllers.getBalance);

module.exports = router;
