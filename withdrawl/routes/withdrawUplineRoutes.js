const express = require("express");
const withdrawController = require("../controllers/withdrawController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(userController.protect, withdrawController.getAllWithdrawUpline);

router
  .route("/:id")
  .patch(userController.protect, withdrawController.updateWithdarw);

module.exports = router;
