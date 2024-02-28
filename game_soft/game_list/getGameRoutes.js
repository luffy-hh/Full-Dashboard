const express = require("express");
const getGameListController = require("./getGameController");
const userController = require("../../users/userControllers");

const router = express.Router();
router.post(userController.protect, getGameListController.getGameList);

module.exports = router;
