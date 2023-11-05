const TwoDLucky = require('../models/TwoDLuckiesModel');
const moment = require("moment-timezone");
const User = require('../../users/userModels')
const MasterSubCatStatus= require('../../category_status/models/master_subCat_status_models')
const Thai2DSale= require('../../2dSales/models/2dsalemodels')

exports.createTwoDLucky = async(req,res,next)=>{
    try {
        const newTwoDLucky = await TwoDLucky.create({
            ...req.body,
            date:new Date()
        })
        console.log(newTwoDLucky)
        const dailyPlayedObjOfEachSubCatArr = await Thai2DSale.deleteMany({subCatId:newTwoDLucky?.subCatId})
        for(let play in dailyPlayedObjOfEachSubCatArr){
            if(play?.number === newTwoDLucky?.number) {
                console.log(play)
                const user = await User.findById(play.userId)
                const upLineAgent = await User.findOne({userId: user?.uplineId})
                const upLineMaster = await User.findOne({userId:upLineAgent.uplineId})
                const masterSubCats = await MasterSubCatStatus.findOne({master_id:upLineMaster._id});
                const masterCommessionOfCurSubCat = masterSubCats.subCatStatus.find(subCat=> subCat._id === play.subCatId)
            }
        }
    }catch (e) {
        res.status(500).json({
            status:'failed',
            message:e.message
        })
    }
}