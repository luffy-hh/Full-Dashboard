const express = require("express");
const shanTableController = require("./shtanTableController");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/")
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    shanTableController.createShanTable
  );

router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    shanTableController.updateShanTable
  );
module.exports = router;
