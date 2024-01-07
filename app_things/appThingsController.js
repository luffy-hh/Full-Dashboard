const AppThings= require('./appThingsModel')
const AppError = require("../utils/appError");

exports.createOrModifyThing = async (req,res,next)=>{
    try {
        const findOneQuery =  AppThings.findOne({settingName: req.body.settingName})
        const existSetting = await findOneQuery
        if(existSetting){
            let updateObj = {}
            if(req.body?.settingText){
                updateObj["settingText"] = req.body.settingText
            }
            if(req.body?.settingOpen){
                updateObj["settingOpen"] = req.body.settingOpen
            }
            // Perform the update
            const updatedSetting = await AppThings.findOneAndUpdate(
                { settingName: req.body.settingName },
                { $set: updateObj },
                { new: true } // To return the updated document
            );
            res.status(200).json({
                status: 'success',
                updatedSetting
            })
        }else{
            const newSetting = await AppThings.create({...req.body})
            res.status(200).json({
                status:'success',
                newSetting
            })
        }
    }catch (e) {
        next(new AppError(process.env.NODE_ENV === "development"? e?.stack : e.message,500))
    }
}

exports.getAppThings = async (req,res,next)=>{
    try {
        const queryObj = { ...req.query };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

        // Parse "true" and "false" strings to boolean
        for (const key in queryObj) {
            if (queryObj[key] === "true") {
                queryObj[key] = true;
            } else if (queryObj[key] === "false") {
                queryObj[key] = false;
            }
        }
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        console.log(queryStr)
        const query = AppThings.find(JSON.parse(queryStr));
        const response = await query;
        res.status(200).json({
            status:'success',
            response
        })
    }catch (e) {
        next(new AppError(process.env.NODE_ENV === "development"? e?.stack : e.message,500))
    }
}