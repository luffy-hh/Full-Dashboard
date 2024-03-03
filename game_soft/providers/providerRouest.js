const express = require("express");
const providerController = require("./providerControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/Provider/create")
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    providerController.createProvider
  );

router
  .route("/Provider/read")
  .get(userController.protect, providerController.readProvuders);

module.exports = router;
