const express = require("express");
const { protect, restrictTo } = require("../../users/userControllers");
const {
  read3dAllNum,
  updateSingle3DNum,
} = require("../controllers/lottery3DControllers");

const router = express.Router();

router
  .route("/")
  .get(protect, restrictTo("Admin", "User"), read3dAllNum)
  .patch(protect, restrictTo("Admin"), updateSingle3DNum);

module.exports = router;
