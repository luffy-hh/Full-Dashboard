const express = require("express");
const shanRingController = require("./controllers");
const userController = require("../../users/userControllers");


const router = express.Router();
// Read All User Roles and Creat User Role
router
  .route("/")
  .post(
    userController.protect,
    userController.restrictTo("Admin","User"),
    shanRingController.createShanRingFromAdmin
  ).get(shanRingController.getAllRing);

router.route('/ringIn').patch(userController.protect,shanRingController.enterShanRing)
router.route('/ringOut').patch(userController.protect,shanRingController.exitFromShanRing)
router.route('/playingCards').post(userController.protect,shanRingController.startPlayingCards)
router
  .route("/:id")
  .get(userController.protect, shanRingController.getShingRingByShanRoll);


// router
//   .route("/:id")
//   .patch(
//     userController.protect,
//     userController.restrictTo("Admin"),
//     shanRollController.uploadShanRollImg,
//     shanRollController.updateShanRoll
//   );
module.exports = router;
