const express = require("express");
const lotterySettingController = require("../controllers/lotterySettingControllers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    lotterySettingController.createLotterySetting
  )
  .get(userController.protect, lotterySettingController.getAllLotterySetting);

router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    lotterySettingController.updateLotterySettingById
  );

module.exports = router;
