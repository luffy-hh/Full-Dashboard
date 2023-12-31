const User = require("../../users/userModels");

exports.getUserBalance= async(userId)=>{
    const user = await User.findOne({ userId: userId });
    // let user_data = {
    //     id: 888,
    //     userId:user.userId,
    //     role:user.role,
    //     unit:user.unit,
    //     gameUnit:user.gameUnit,
    //     promotionUnit:user.promotionUnit
    // }
    let user_data = {
        id: 111,
        userId:userId,
        role:'USR',
        unit:1000,
        gameUnit:2000,
        promotionUnit:3000
    }
    return user_data;
}