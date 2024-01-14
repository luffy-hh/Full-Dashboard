const express = require("express");
const shanRoleController = require("./shanRoleController");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .post(
    shanRoleController.uploadShanRoleImg,
    userController.protect,
    userController.restrictTo("Admin"),
    shanRoleController.createShanRole
  )
  .get(userController.protect, shanRoleController.getShanRoleAll);

router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    shanRoleController.uploadShanRoleImg,
    shanRoleController.updateShanRole
  );
module.exports = router;
