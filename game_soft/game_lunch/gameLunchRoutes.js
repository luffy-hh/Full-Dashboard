const express = require("express");
const lunchGameController = require("./gameLunchControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router.post(userController.protect, lunchGameController.lunchGame);

module.exports = router;
