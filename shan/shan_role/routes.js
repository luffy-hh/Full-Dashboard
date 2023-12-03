const express = require("express");
const shanRollController = require("./controllers");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .post(
    shanRollController.uploadShanRollImg,
    userController.protect,
    userController.restrictTo("Admin"),
    shanRollController.createShanRoll
  )
  .get(userController.protect, shanRollController.getShanRollAll);

router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    shanRollController.uploadShanRollImg,
    shanRollController.updateShanRoll
  );
module.exports = router;
