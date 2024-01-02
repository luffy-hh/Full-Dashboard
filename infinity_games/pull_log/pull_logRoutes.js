const express = require("express");
const pullLogController = require("./pull_logConrollers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/PullLog")
  .post(userController.protect, pullLogController.gamePullLog);

module.exports = router;
