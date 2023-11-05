const mongoose= require('mongoose');
const LuckyWinnerSchema= mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:[true,'User is Required'],
    },
    playedAmount:{
        type:Number,
        required:true
    },returnedAmount:{
        type:Number,
        required: true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})
const LuckyWinner= mongoose.model('LuckyWinner',LuckyWinnerSchema)
module.exports= LuckyWinner