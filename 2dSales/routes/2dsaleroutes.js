const express = require("express");
const Sale2DController = require("../controllers/2dsalecontrollers");
const SaleHistoryController = require('../controllers/2dSaleHistoriesController')
const userController = require("../../users/userControllers");

const router = express.Router();

router
  .route("/")
  .post(
    userController.protect,
    Sale2DController.create2DsaleDoc
  ).get(userController.protect,SaleHistoryController.getHistory);

module.exports = router;
