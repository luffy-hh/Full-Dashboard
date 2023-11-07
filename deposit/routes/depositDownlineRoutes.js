const express = require("express");
const depositController = require("../controllers/depositController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(userController.protect, depositController.getDepositDownline);

module.exports = router;
