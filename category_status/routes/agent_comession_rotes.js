const express = require("express");
const AgentSubCatComessionController = require("../controllers/agent_comession_controller");
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin", "Master", "Agent"),
    AgentSubCatComessionController.getGameSubCatComessionAll
  )

  .patch(
    userController.protect,
    userController.restrictTo("Admin", "Master"),
    AgentSubCatComessionController.updateGameSubCatComession
  );

module.exports = router;
