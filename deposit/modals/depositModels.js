const mongoose = require("mongoose");

const depositSchema = new mongoose.Schema({
  fromId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  toId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bankName_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankName",
    required: true,
  },
  fromAcc: {
    type: String,
    require: true,
  },
  toAcc: {
    type: String,
    require: true,
  },
  transferCode: {
    type: String,
    unique: true,
    required: [true, "Please Enter Your Transfer Code Last Number 6 Digit"],
    minlength: 6,
  },
  amount: {
    type: Number,
    required: [true, "Please Enter Your Transfer Amount"],
  },
  action_time: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "Panding",
  },
  description: {
    type: String,
    default: "Deposit",
  },
});

const Deposit = mongoose.model("Deposit", depositSchema);

module.exports = Deposit;
