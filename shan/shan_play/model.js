const mongoose = require('mongoose')

const shanPlaySchema =new mongoose.Schema({
    ringId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "ShanPlayRing",
        required: true
    },
    holderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    cards:[
        {
            cardId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"ShanCard"
            }
        }
    ]

})

const ShanPlay = mongoose.model("ShanPlay",shanPlaySchema);
module.exports = ShanPlay;