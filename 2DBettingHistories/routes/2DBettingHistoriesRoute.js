const express = require("express");
const userController = require("../../users/userControllers");

const BettingHistories = require("../models/2DBettingHistoriesModel");
const {
  getAllBettingHistories,
} = require("../controllers/2DBettingHistoriesControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "User"),
    getAllBettingHistories
  );

module.exports = router;
