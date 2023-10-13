const express = require("express");
const userRoleController = require("./userRolesController");

const router = express.Router();
// Read All User Roles and Creat User Role
router.route("/").get(userRoleController.getUsersRoleAll);

module.exports = router;
