const express = require("express");
const checkBalanceConrollers = require("./checkBalanceControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/CheckBalance")
  .post(userController.protect, checkBalanceConrollers.checkBalance);

module.exports = router;
