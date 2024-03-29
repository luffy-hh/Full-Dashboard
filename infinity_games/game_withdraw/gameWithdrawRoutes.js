const express = require("express");
const gameWithdarwControllers = require("./gameWithdarwControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/Withdraw")
  .post(userController.protect, gameWithdarwControllers.gameWithdraw);

module.exports = router;
