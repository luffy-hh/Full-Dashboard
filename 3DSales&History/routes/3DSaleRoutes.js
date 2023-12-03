const express = require("express");
const userController = require("../../users/userControllers");
const {create3DSaleDoc} = require("../controllers/3dSaleControllers");
const {getHistory} = require("../controllers/3dSaleHistoriesControllers");

const router = express.Router();

router
    .route("/")
    .post(userController.protect,create3DSaleDoc)
    .get(userController.protect, getHistory);
module.exports = router;
