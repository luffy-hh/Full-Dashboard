const mongoose = require("mongoose");
const TransactionRecordSchema = mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        sender_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        before_amt: {
            type: Number,
            required: true,
        },
        action_amt: {
            type: Number,
            required: true,
        },
        after_amt: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
        },
        status: {
            type: String,
            enum: ["In", "Out"],
        },
        additional_info: {
            type: String,
        }
    },
    {timestamps: true}
);
const TransactionRecord = mongoose.model(
    "TransactionRecord",
    TransactionRecordSchema
);
module.exports = TransactionRecord;
