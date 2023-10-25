const WinedModel = require('../models/2DWinedModel')

exports.createWined = async (obj)=>{
    const newWinned = await WinedModel.create({...obj})
    return newWinned;
}