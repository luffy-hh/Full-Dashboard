const express = require("express");
const userController = require("./userControllers");

const router = express.Router();
// Profile
router.route("/").get(userController.protect, userController.getProfile);

module.exports = router;
