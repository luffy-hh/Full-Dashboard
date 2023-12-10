const express = require("express");
const gameCategoriesController = require("./controllers");
const userController = require("../../users/userControllers");
const router = express.Router();

// Define routes
router.route("/").get(gameCategoriesController.getGameCategories);

module.exports = router;
