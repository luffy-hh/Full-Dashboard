const express = require("express");
const lunchGameController = require("./gameLunchControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/Seamless/LaunchGame")
  .post(userController.protect, lunchGameController.lunchGame);

module.exports = router;
