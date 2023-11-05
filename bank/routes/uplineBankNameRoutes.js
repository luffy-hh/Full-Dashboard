const express = require("express");
const uplineBankNames = require("../controllers/shwoUplineBankNameControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .get(userController.protect, uplineBankNames.getUplineBankName);

module.exports = router;
