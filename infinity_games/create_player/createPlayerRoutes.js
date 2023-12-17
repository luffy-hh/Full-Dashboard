const express = require("express");
const createPlayerController = require("./createPlayerControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/createPlayer")
  .post(userController.protect, createPlayerController.createPlayerController);

// router
//   .route("/")
//   .patch(
//     userController.protect,
//     userController.restrictTo("Admin"),
//     mainUnitController.updateMainUnit
//   );

module.exports = router;
