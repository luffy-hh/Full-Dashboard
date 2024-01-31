const express = require("express");
const transitionController = require("../controllers/transitionControllers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .post(userController.protect, transitionController.transferUnit)
  .get(userController.protect, transitionController.transferHistory);

router
  .route("/:id")
  .post(
    userController.protect,
    userController.checkSecurityCode,
    transitionController.transferUnitWithUserId
  );
module.exports = router;
