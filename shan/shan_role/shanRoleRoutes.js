const express = require("express");
const shanRoleController = require("./shanRoleController");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/")
  .post(
    shanRoleController.uploadShanRoleImg,
    userController.protect,
    userController.restrictTo("Admin"),
    shanRoleController.createShanRole
  );

router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    shanRoleController.uploadShanRoleImg,
    shanRoleController.updateShanRole
  );
module.exports = router;
