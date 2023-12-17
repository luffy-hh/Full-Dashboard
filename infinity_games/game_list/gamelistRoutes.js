const express = require("express");
const getGameListController = require("./gamelistControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/getGameList")
  .post(
    userController.protect,
    userController.restrictTo("User"),
    getGameListController.getGameListController
  );

module.exports = router;
