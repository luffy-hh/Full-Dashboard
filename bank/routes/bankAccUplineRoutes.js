const express = require("express");
const bankAccController = require("../controllers/bankAccControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
// Read All User Roles and Creat User Role
router.route("/").get(userController.protect, bankAccController.getBankAccAll);
module.exports = router;
