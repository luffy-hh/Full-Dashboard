const mongoose = require("mongoose");

const shanCardSchema = new mongoose.Schema({
    cardType:{type:String,required:true},
    cardValue:{type: Number, required: true},
    cardName :{type: String, required: true}
})

const ShanCard = mongoose.model("ShanCard",shanCardSchema);
module.exports = ShanCard;