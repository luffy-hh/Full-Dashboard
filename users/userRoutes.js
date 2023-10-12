const express = require("express");
const userController = require("./userControllers");

const router = express.Router();
//User Register
router.route("/signup").post(userController.signup);

//User Login
router.post("/login", userController.login);

// All Get User
router
  .route("/")
  .get(
    userController.protect,
    userController.restrictTo("Admin"),
    userController.getUsersAll
  );

// router.route("/:id").patch(adminController.updateAdminAcc);

module.exports = router;
