const express = require("express");
const { protect, restrictTo } = require("../../users/userControllers");
const { getAllLuckyWinner } = require("../controllers/LuckyWinnerController");
const router = express.Router();

router.route("/").get(protect, restrictTo("Admin"), getAllLuckyWinner);

module.exports = router;
