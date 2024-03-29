const express = require("express");
const userController = require("../users/userControllers");
const {
  getAllTransactionRecord,
  getRelatedRecordForUser,
} = require("./transactionRecordController");
const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "Master", "Agent"),
    getAllTransactionRecord
  );
router.route("/my-own").get(userController.protect, getRelatedRecordForUser);

module.exports = router;
