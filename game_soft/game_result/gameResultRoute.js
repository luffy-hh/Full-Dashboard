const express = require("express");
const gameResultController = require("./gameResultController");

const router = express.Router();
router.route("/Seamless/GameResult").post(gameResultController.gameResult);

module.exports = router;
