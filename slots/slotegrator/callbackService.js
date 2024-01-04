const User = require("../../users/userModels");

exports.getUserBalance= async(userId)=>{
    const user = await User.findOne({ userId: userId });
    let user_data = {
        id: 445,
        userId:user.userId,
        role:user.role,
        unit:user.unit,
        gameUnit:user.gameUnit,
        promotionUnit:user.promotionUnit
    }
  
    return user_data;
}


//when player trying to make a bet.
exports.betSlot = async(userId,bet_amount)=>{
    //reduce user's balance, send ag commission ,etc...
    let user = await User.findOneAndUpdate({userId:userId},{$inc:{unit:-bet_amount}});
    return {
        current_balance:user.unit,
        transaction_id:'XXXXXXXXX'
    }
}

//when player win in a game
exports.winSlot = async(userId,win_amount)=>{
    //increase user's balance, record transaction,etc...
    let user = await User.findOneAndUpdate({userId:userId},{$inc:{unit:win_amount}});
    return {
        current_balance:user.unit,
        transaction_id:'XXXXXXXXX'
    }
}

//Refund is a cash back in case bet problems.
exports.refund = async(userId,refund_amount)=>{
    //increase user's balance, record transaction,etc...
    let user = await User.findOneAndUpdate({userId:userId},{$inc:{unit:refund_amount}});
    return {
        current_balance:user.unit,
        transaction_id:'XXXXXXXXX'
    }
}