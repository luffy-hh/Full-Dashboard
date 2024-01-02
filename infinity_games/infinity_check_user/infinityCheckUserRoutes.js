const express = require("express");
const checkPlayerController = require("./infinityCheckUserControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/checkPlayer")
  .get(userController.protect, checkPlayerController.checkPlayerController);

module.exports = router;
