const express = require("express");
const userController = require("./userControllers");

const router = express.Router();
//User Register
router.route("/signup").post(userController.signup);

//User Login
router.post("/login", userController.login);

router.get("/test", userController.test);
// Forget Password
router.post(
  "/forgotPassword",
  userController.protect,
  userController.forgetPassword
);
router.patch(
  "/resetPassword/:token",
  userController.protect,
  userController.resetPassword
);
router.patch(
  "/updateMyPassword",
  userController.protect,
  userController.updatePassword
);

// All Get User
router.route("/").get(userController.protect, userController.getUsersAll);
// Profile
router
  .route("/User/profile")
  .get(userController.protect, userController.getProfile);

router
  .route("/:id")
  .patch(
    userController.protect,
    userController.restrictTo("Admin", "Master", "Agent"),
    userController.updateProfile
  )
  .put(
    userController.protect,
    userController.restrictTo("Admin", "Master"),
    userController.updatePasswordFromUpline
  );
// router
//   .route("/user/master")
//   .patch(
//     userController.protect,
//     userController.restrictTo("Admin"),
//     userController.updateMasterStatus
//   );

module.exports = router;
