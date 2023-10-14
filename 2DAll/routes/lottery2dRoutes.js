const express = require("express");
const lottery2dController = require("../controllers/thai2DLotteryMorning12Controllers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "User"),
    lottery2dController.read2dAllNum
  );

router.route("/:id").patch(lottery2dController.updateSingle2DNum);
// .delete(lottery2dController.deleteSingle2DNum);

module.exports = router;
