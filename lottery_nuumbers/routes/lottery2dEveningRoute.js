const express = require("express");
const lotteryEveningController = require("../controllers/thai2DLotteryEveningController");
const { protect, restrictTo } = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    protect,
    restrictTo("Admin", "User"),
    lotteryEveningController.read2dAllNum
  )
  .patch(protect, restrictTo("Admin"), lotteryEveningController.update2DNum);

module.exports = router;
