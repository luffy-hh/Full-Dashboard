const mongoose = require("mongoose");
const lottery2dNumberMorning12Schema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, "2D Number must be add"],
    unique: true,
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

const Thai2DNum12AM = mongoose.model(
  "Thai2DNum12AM",
  lottery2dNumberMorning12Schema
);
module.exports = Thai2DNum12AM;
