const express = require("express");
const depositController = require("../controllers/depositController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .post(userController.protect, depositController.createDeposit)
  .get(userController.protect, depositController.getDeposit);

module.exports = router;
