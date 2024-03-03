const express = require("express");
const gameTypeController = require("./gameTypeControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/GameType/create")
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    gameTypeController.createGameType
  );

router
  .route("/GameType/read")
  .get(userController.protect, gameTypeController.readGameTypes);

module.exports = router;
