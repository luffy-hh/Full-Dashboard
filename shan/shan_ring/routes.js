const express = require("express");
const shanRingController = require("./controllers");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    shanRingController.createShanRingFromAdmin
  );

router
  .route("/:id")
  .get(userController.protect, shanRingController.getShingRingByShanRoll);

// router
//   .route("/:id")
//   .patch(
//     userController.protect,
//     userController.restrictTo("Admin"),
//     shanRollController.uploadShanRollImg,
//     shanRollController.updateShanRoll
//   );
module.exports = router;
