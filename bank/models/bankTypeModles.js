const mongoose = require("mongoose");
const bankTypeSchema = new mongoose.Schema({
  bankCatData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BankCategories",
    required: [true, "Bank type must be specified"],
  },
  bankTypeName: {
    type: String,
    required: [true, "Product name must be add"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const BankType = mongoose.model("BankType", bankTypeSchema);
module.exports = BankType;
