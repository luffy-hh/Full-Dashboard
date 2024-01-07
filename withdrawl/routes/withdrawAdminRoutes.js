const express = require("express");
const withdrawController = require("../controllers/withdrawController");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/:id")
  .patch(userController.protect, withdrawController.updateWithDrawalFromAdmin);

module.exports = router;
