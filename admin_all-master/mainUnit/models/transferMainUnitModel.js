const mongoose = require("mongoose");
const transferMainUnitSchema = new mongoose.Schema({
  transferUnit: {
    type: Number,
    required: [true, "Main Unit Transfer Value Must Be Add"],
  },
  beforeUnitAmt: {
    type: Number,
    required: [true, "Main Unit Before Transfer Value Must Be Add"],
  },
  afterUnitAmt: {
    type: Number,
    required: [true, "Main Unit After Transfer Value Must Be Add"],
  },
  fromId: {
    type: String,
    required: [true, "Transfer Person ID Must Be Add"],
  },
  fromName: {
    type: String,
    required: [true, "Transfer Person Name Must Be Add"],
  },
  toId: {
    type: String,
    required: [true, "Recieve Person ID Must Be Add"],
  },
  toName: {
    type: String,
    required: [true, "Recieve Person Name Must Be Add"],
  },
  currentDate: {
    type: Date,
    default: Date.now(),
  },
  status: String,
});
const MainUnitTransfer = mongoose.model(
  "MainUnitTransfer",
  transferMainUnitSchema
);
module.exports = MainUnitTransfer;
