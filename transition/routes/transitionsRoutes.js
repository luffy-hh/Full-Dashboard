const express = require("express");
const transitionController = require("../controllers/transitionControllers");
const userController = require("../../users/userControllers");
const {transferUnitWithUserId} = require("../controllers/transitionControllers");

const router = express.Router();

router
  .route("/")
  .post(userController.protect, transitionController.transferUnit)
  .get(userController.protect, transitionController.transferHistory);

router.route("/:id").post(userController.protect,transitionController.transferUnitWithUserId)
module.exports = router;
