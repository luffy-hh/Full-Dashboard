const mongoose = require("mongoose");
const moment = require("moment-timezone");
moment.tz.setDefault("Asia/Yangon");

const lotterySettingSchema = new mongoose.Schema({
  subCategoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "GameSubCat",
    required: true,
  },
  subCategoryName: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
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
