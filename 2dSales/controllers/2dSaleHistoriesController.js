const TwoDSaleHistories = require('../models/2dSaleHistoriesModel')

exports.getHistory = async (req,res)=>{
    try {
        const loginUserRole = req.user.role;

    }catch (e){
        res.status(400).json({
            status:'failed',
            message:'Something went wrong with your request.'
        })
    }
}