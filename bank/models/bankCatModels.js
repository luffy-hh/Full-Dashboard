const mongoose = require("mongoose");
const bankCategoriesSchema = new mongoose.Schema({
  bankCatName: {
    type: String,
    required: [true, "Product name must be add"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});
const BankCategories = mongoose.model("BankCategories", bankCategoriesSchema);
module.exports = BankCategories;
