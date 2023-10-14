const mongoose = require("mongoose");
const GameSubCats = require("../../gameCategories/models/gameSubCatModels");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Yangon");

const lotterySettingSchema = new mongoose.Schema({
  subCategoryId: String,
  subCategoryName: String,
  settingName: {
    type: String,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  mainCompensation: {
    type: Number,
    default: 0,
  },
  otherCompensation: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
  limitAmount: {
    type: Number,
    default: 0,
  },
});

const lotterySetting = mongoose.model("lotterySetting", lotterySettingSchema);
module.exports = lotterySetting;
