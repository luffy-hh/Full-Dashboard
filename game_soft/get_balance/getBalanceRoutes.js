const express = require("express");
const getBalanceControllers = require("./getBalanceControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/getbalance")
  .post(userController.protect, getBalanceControllers.getBalance);

module.exports = router;
