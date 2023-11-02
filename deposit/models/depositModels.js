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
  date: {
    type: String,
    required: true,
  },
  bankName_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankName",
    required: true,
  },
  bankAcc: {
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
    minlength: 6,
  },
  status: {
    type: String,
    default: true,
  },
  description: "String",
});

const Deposit = mongoose.model("Deposit", depositSchema);

module.exports = Deposit;
