const express = require("express");
const { protect, restrictTo } = require("../../users/userControllers");
const {
  getAll3DLuckyWinner,
} = require("../controllers/Thai3DLuckyWinnerController");

const router = express.Router();

router.route("/").get(protect, restrictTo("Admin"), getAll3DLuckyWinner);

module.exports = router;
