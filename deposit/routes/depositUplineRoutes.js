const express = require("express");
const depositController = require("../controllers/depositController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(userController.protect, depositController.getDepositUpline);

router
  .route("/:id")
  .patch(userController.protect, depositController.updateDeposit);

module.exports = router;
