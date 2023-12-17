const express = require("express");
const gameLoginControllers = require("./gameLoginControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router
  .route("/GameLogin")
  .post(userController.protect, gameLoginControllers.gameLogin);

module.exports = router;
