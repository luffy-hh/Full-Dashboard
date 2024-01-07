const express = require('express')
const {protect, restrictTo} = require("../users/userControllers");
const {createOrModifyThing, getAppThings} = require("./appThingsController");
const router = express.Router()

router.route('/')
    .post(protect,restrictTo('Admin'),createOrModifyThing)
    .get(protect,getAppThings)


module.exports = router