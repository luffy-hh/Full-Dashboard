const mongoose = require("mongoose");

const shanCardSchema = new mongoose.Schema({
  type: { type: String, required: true },
  name: { type: String, required: true },
  value: { type: Number, required: true },
  numberPower: Number,
  cardPower: Number,
});

const ShanCard = mongoose.model("ShanCard", shanCardSchema);
module.exports = ShanCard;
