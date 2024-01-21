const mongoose = require("mongoose");

const shanTableSchema = new mongoose.Schema({
  tableName: {
    type: "String",
    required: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ShanRoll",
    required: true,
  },
  banker_amount: {
    type: Number,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ["inactive", "active"],
    default: "inactive",
  },
  endPoint: {
    type: String,
  },
  tableNamespaceId: {
    type: String,
  },
  players: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      player_role: {
        type: String,
        enum: ["banker", "player"],
        default: "banker",
      },
      game_unit: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const ShanTable = mongoose.model("ShanTable", shanTableSchema);

module.exports = ShanTable;
