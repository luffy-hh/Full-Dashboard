const express = require("express");
const shanTableController = require("./shanTableController");
const userController = require("../../users/userControllers");


const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .post(
    userController.protect,
    userController.restrictTo("Admin","User"),
    shanTableController.createShanTableFromAdmin
  ).get(shanTableController.getAllTables);

// router.route('/ringIn').patch(userController.protect,shanTableController.enterShanRing)
// router.route('/ringOut').patch(userController.protect,shanTableController.exitFromShanRing)
// router.route('/playingCards').post(userController.protect,shanTableController.startPlayingCards)
router
  .route("/:id")
  .get(userController.protect, shanTableController.getTablesByRole);


// router
//   .route("/:id")
//   .patch(
//     userController.protect,
//     userController.restrictTo("Admin"),
//     shanRollController.uploadShanRollImg,
//     shanRollController.updateShanRoll
//   );
module.exports = router;
