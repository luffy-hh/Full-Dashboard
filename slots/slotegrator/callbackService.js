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
    return {
        current_balance:10000,
        transaction_id:'XXXXXXXXX'
    }
}

//when player win in a game
exports.winSlot = async(userId,win_amount)=>{
    //increase user's balance, record transaction,etc...
    return {
        current_balance:10000,
        transaction_id:'XXXXXXXXX'
    }
}

//Refund is a cash back in case bet problems.
exports.refund = async(userId,refund_amount)=>{
    //increase user's balance, record transaction,etc...
    return {
        current_balance:10000,
        transaction_id:'XXXXXXXXX'
    }
}