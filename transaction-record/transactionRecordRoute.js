const express = require('express');
const userController = require("../users/userControllers");
const {getAllTransactionRecord} = require("./transactionRecordController");
const router = express.Router();

router.route('/').get(userController.protect,userController.restrictTo("Admin","Master","Agent"),getAllTransactionRecord)

module.exports = router;