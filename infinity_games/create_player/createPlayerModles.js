const mongoose = require("mongoose");

const infinityPlayerSchema = new mongoose.Schema({
  playerId: {
    type: String,
    required: [true, "Please Add Game Category Name"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  infinityUnit: {
    type: Number,
    default: 0,
  },
});

const InfinityPlayer = mongoose.model("InfinityPlayer", infinityPlayerSchema);

module.exports = InfinityPlayer;
