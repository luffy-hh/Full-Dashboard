const express = require("express");
const depositController = require("../controllers/depositController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/:id")
  .patch(userController.protect, depositController.updateDepositMasterToAdmin);

module.exports = router;
