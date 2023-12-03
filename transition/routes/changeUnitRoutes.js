const express = require("express");
const changeUnitControllers = require("../controllers/changeUnitControllers");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .patch(userController.protect, changeUnitControllers.changeUnit);

module.exports = router;
