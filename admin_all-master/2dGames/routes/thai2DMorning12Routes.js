const express = require("express");
const containerThai2DMorning12 = require("../controllers/thai2DMorning12Controllers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "User"),
    containerThai2DMorning12.container2DMorning12
  );

module.exports = router;
