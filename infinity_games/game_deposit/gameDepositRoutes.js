const express = require("express");
const gameDepositController = require("./gameDepositControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/Deposit")
  .post(userController.protect, gameDepositController.gameDeposit);

module.exports = router;
