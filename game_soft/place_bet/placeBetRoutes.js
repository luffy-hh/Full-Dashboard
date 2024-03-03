const express = require("express");
const placeBetControllers = require("./placeBetControllers");
const userController = require("../../users/userControllers");

const router = express.Router();
router.route("/Seamless/PlaceBet").post(placeBetControllers.placeBet);

module.exports = router;
