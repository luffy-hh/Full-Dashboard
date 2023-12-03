const mongoose = require("mongoose");

const shanRollSchema = new mongoose.Schema({
  roll_name: {
    type: String,
    required: [true, "Shan Roll Name must be added"],
  },
  min_amount: {
    type: Number,
    required: [true, "Minimum Amount must be added"],
  },
  max_amount: {
    type: Number,
    required: [true, "Maximum Amount must be added"],
  },
  banker_amount: {
    type: Number,
    required: [true, "Maximum Amount must be added"],
  },
  per_amt: {
    type: Number,
    required: [true, "Pleae Insert Percentage must be"],
  },
  img: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const ShanRoll = mongoose.model("ShanRoll", shanRollSchema);
module.exports = ShanRoll;
