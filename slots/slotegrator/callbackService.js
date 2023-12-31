const User = require("../../users/userModels");

exports.getUserBalance= async(userId)=>{
    const user = await User.findOne({ userId: 367321 });
    let user_data = {
        id: 888,
        userId:user.userId,
        role:user.role,
        unit:user.unit,
        gameUnit:user.gameUnit,
        promotionUnit:user.promotionUnit
    }
  
    return user_data;
}