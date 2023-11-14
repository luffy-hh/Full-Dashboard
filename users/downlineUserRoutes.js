const express = require("express");
const userController = require("./userControllers");

const router = express.Router();

router.route("/:id").get(userController.protect, userController.downlineUser);

module.exports = router;
