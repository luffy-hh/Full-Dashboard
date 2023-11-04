const express = require("express");
const bankCatController = require("../controllers/bankCatControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .get(userController.protect, bankCatController.getBankCatAll)
  .post(
    userController.protect,
    userController.restrictTo("Admin"),
    bankCatController.createBankCat
  )
  .patch(
    userController.protect,
    userController.restrictTo("Admin"),
    bankCatController.updateBankCategory
  );

module.exports = router;
