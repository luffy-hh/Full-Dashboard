const express = require("express");

const userController = require("../../users/userControllers");
const { create2DLucky } = require("../controllers/2DLuckyNumberController");
const router = express.Router();

router
  .route("/")
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    create2DLucky
  );

module.exports = router;
