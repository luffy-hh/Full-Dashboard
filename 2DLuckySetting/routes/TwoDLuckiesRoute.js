const express = require("express");
const { protect, restrictTo } = require("../../users/userControllers");
const { createTwoDLucky } = require("../controllers/TwoDLuckiesController");
const router = express.Router();

router.route("/").post(protect, restrictTo("Admin"), createTwoDLucky).get();

module.exports = router;
