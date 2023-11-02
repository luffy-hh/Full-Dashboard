const express = require("express");
const depositController = require("../controllers/depositController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(userController.protect, depositController.getDeposit)
  .post(userController.protect, depositController.createDeposit)
  .patch(userController.protect, depositController.updateDepositStatus);

module.exports = router;
