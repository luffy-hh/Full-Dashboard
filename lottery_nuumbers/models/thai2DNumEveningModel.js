const mongoose = require("mongoose");
const Thai2dEveningSchema = new mongoose.Schema({
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
  rotation: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Thai2DNumEvening = mongoose.model(
  "Thai2DNumEvening",
  Thai2dEveningSchema
);
module.exports = Thai2DNumEvening;
