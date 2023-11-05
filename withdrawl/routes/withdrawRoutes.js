const express = require("express");
const withdrawController = require("../controllers/withdrawController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .post(userController.protect, withdrawController.createWithdraw)
  .get(userController.protect, withdrawController.getAllWithdraw);

// router
//   .route("/:id")
//   .patch(
//     userController.protect,
//     userController.restrictTo("Admin"),
//     lotterySettingController.updateLotterySettingById
//   );

module.exports = router;
