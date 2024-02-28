const mongoose = require("mongoose");
const ProviderSchema = mongoose.Schema({
  providerCode: {
    type: Number,
    required: [true, "Please insert Provider Code"],
  },
  providerName: {
    type: String,
    required: [true, "Please insert Provider Name"],
  },
  gameTypeCode: {
    type: Number,
    required: [true, "Please insert Game Type Code"],
  },
  gameType: {
    type: String,
    required: [true, "Please insert Game Type Name"],
  },
});

const GameSoftProvider = mongoose.model("GameSoftProvider", ProviderSchema);
module.exports = GameSoftProvider;
