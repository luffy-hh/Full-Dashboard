const express = require("express");
const showDepositAccController = require("../controllers/showDepositAccController");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .get(userController.protect, showDepositAccController.getBankAccDeposit);

module.exports = router;
