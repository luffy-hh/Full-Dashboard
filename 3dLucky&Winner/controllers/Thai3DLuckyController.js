const MainUnit = require("../../mainUnit/models/mainUnitModel");
const Thai3DLucky = require('../models/Thai3DLuckyModel')
const Thai2DNum12Am = require("../../lottery_nuumbers/models/thai2DNum12Models");

exports.create3DLucky = async (req,res)=>{
    try{
        const mainUnitArr = await MainUnit.find({});
        const mainUnitId = mainUnitArr[0]._id;
        const currentDay = new Date.now();
        const new3DLucky = await Thai3DLucky.create({
            ...req.body,
            date:currentDay
        })
        const docs = await Thai3DNum.find({});
        for (let doc of docs) {
            doc.lastAmount = doc.limitAmount;
            doc.totalAmount = 0;
            doc.percentage = 0;
            await doc.save();
        }
    }catch (e) {
        res.status(500).json({
            status: "failed",
            message: e.message,
        });
    }
}