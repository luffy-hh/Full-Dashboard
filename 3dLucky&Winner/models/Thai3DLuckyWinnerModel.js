const mongoose = require("mongoose");
const Thai3DLuckyWinnerSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is Required"],
    },
    playedAmount: {
        type: Number,
        required: true,
    },
    returnedAmount: {
        type: Number,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
});
const Thai3DLuckyWinner = mongoose.model("Thai3DLuckyWinner", Thai3DLuckyWinnerSchema);
module.exports = Thai3DLuckyWinner;
