const express = require("express");

const userController = require("../../users/userControllers");
const router = express.Router();

router
  .route("/")
  .post(userController.protect, userController.restrictTo("Admin"));
