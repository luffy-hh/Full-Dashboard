const express= require('express')
const {protect} = require("../../users/userControllers");
const {startPlaying} = require("./controllers");
const router = express.Router();

router.route('/').post(protect,startPlaying)

module.exports = router