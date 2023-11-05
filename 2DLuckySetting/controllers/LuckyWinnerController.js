const LuckyWinner= require('../models/LuckyWinnerModel')

exports.createLuckyWinner= async (obj)=>{
    return await LuckyWinner.create({...obj});
}