const mongoose = require("mongoose");
const lottery2dNumberMorning12Schema = new mongoose.Schema({
  number: {
    type: String,
    required: [true, "2D Number must be added"],
    unique: true,
  },
  limitAmount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    default: 0,
  },
  lastAmount: {
    type: Number,
    default: 0,
  },
  percentage: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

// lottery2dNumberMorning12Schema.pre("save", function (next) {
//   this.lastAmount = this.limitAmount - this.totalAmount;

//   this.percentage = (this.totalAmount / this.limitAmount) * 100;
//   next();
// });

const Thai2DNum12AM = mongoose.model(
  "Thai2DNum12AM",
  lottery2dNumberMorning12Schema
);
module.exports = Thai2DNum12AM;
