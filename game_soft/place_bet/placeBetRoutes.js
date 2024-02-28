const express = require("express");
const placeBetControllers = require("./placeBetControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router.post(userController.protect, placeBetControllers.placeBet);

module.exports = router;
