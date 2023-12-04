const express = require("express");
const { protect, restrictTo } = require("../../users/userControllers");
const {
  create3DLucky,
  getAll3DLuckies,
} = require("../controllers/Thai3DLuckyController");

const router = express.Router();

router
  .route("/")
  .post(protect, restrictTo("Admin"), create3DLucky)
  .get(getAll3DLuckies);

module.exports = router;
