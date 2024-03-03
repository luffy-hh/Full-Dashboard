const express = require("express");
const getBalanceControllers = require("./getBalanceControllers");

const router = express.Router();
router.route("/Seamless/GetBalance").post(getBalanceControllers.getBalance);

module.exports = router;
