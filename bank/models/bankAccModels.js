const mongoose = require("mongoose");

const bankAccSchema = new mongoose.Schema({
  bankNameData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankName",
    required: [true, "Bank Name must be specified"],
  },
  ownderData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Bank Account Owner must be specified"],
  },
  account_name: {
    type: String,
    required: [true, "Bank account must be added"],
  },
  account: {
    type: String,
    required: [true, "Bank account must be added"],
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const BankAcc = mongoose.model("BankAcc", bankAccSchema);
module.exports = BankAcc;
