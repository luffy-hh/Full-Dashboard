const mongoose = require("mongoose");
const TwoDLuckySchema = mongoose.Schema(
  {
    luckyNumber: { type: String, require: true },
    subCatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "gameSubCats",
      require: true,
    },
    name: { type: String, require: true },
    date: { type: Date, require: true },
  },
  { timestamps: true }
);

const TwoDLucky = mongoose.model("TwoDLucky", TwoDLuckySchema);
module.exports = TwoDLucky;
