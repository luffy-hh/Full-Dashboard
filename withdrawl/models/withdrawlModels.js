const mongoose = require("mongoose");

const withdrawlSchema = new mongoose.Schema({
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
  bankNameId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankName",
    required: true,
  },
  recAcc: {
    type: String,
    required: true,
  },
  recAccName: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  status: {
    type: String,
    default: "Panding",
  },
  description: {
    type: String,
    default: "Withdraw",
  },
  action_time: {
    type: String,
  },
});

const Withdrawl = mongoose.model("Withdrawl", withdrawlSchema);

module.exports = Withdrawl;
