const express = require("express");
const depositController = require("../controllers/depositController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .post(userController.protect, depositController.createWithdraw)
  .get(userController.protect, depositController.getAllWithdraw);

module.exports = router;
