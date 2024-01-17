const TransactionRecord = require('./transactionRecordModel')
const catchAsync = require('../utils/catchAsync')
const AppError = require("../utils/appError");
// Access Private
exports.createTransactionRecord = catchAsync(async (obj)=>{
    try {
        return await TransactionRecord.create({...obj});
    }catch (e) {
        return {
            status:'failed',
            message:process.env.NODE_ENV === 'development'? e?.stack : e?.message
        }
    }
})

//get all transactionRecord
//@access private (Admin)
//url /api/v1/transactionRecord
exports.getAllTransactionRecord = catchAsync(async (req,res,next)=>{
    try {
        // Filtering
        // const queryObj = {...req.query};
        // console.log("queryObj :" ,queryObj)
        // const excludeFields = ["page", "sort", "limit", "fields"];
        // excludeFields.forEach((el) => delete queryObj[el]);
        // let queryStr = JSON.stringify(queryObj);
        // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        // let query = TransactionRecord.find(JSON.parse(queryStr));
        const queryObj = { ...req.query };
        console.log("queryObj :", queryObj);

// Exclude fields
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach((el) => delete queryObj[el]);

// Function to convert keys and values
        function convertKeysAndValues(obj) {
            let newObj = {};
            for (let key in obj) {
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    for (let subKey in obj[key]) {
                        let newKey = `$${subKey}`;
                        let newValue;
                        if (newKey === '$in') {
                            newValue = obj[key][subKey].includes(',') ? obj[key][subKey].split(',') : [obj[key][subKey]];
                        } else if (newKey === '$gt' || newKey === '$lt' || newKey === '$gte' || newKey === '$lte') {
                            // Check if value is a number or a date string
                            newValue = isNaN(obj[key][subKey]) ? new Date(obj[key][subKey]) : Number(obj[key][subKey]);
                        }
                        newObj[key] = { ...newObj[key], [newKey]: newValue };
                    }
                } else {
                    newObj[key] = obj[key];
                }
            }
            return newObj;
        }

        // Convert original object
        let convertedObj = convertKeysAndValues(queryObj);

        // Convert to string and replace keys
        let queryStr = JSON.stringify(convertedObj);
        console.log(JSON.parse(queryStr))
        let query = TransactionRecord.find(JSON.parse(queryStr));
        // Sorting

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt");
        }

        // limiting the fields

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            query = query.select(fields);
        } else {
            query = query.select("-__v");
        }

        // pagination

        const page = req.query.page;
        const limit = req.query.limit;
        const skip = (page - 1) * limit;
        query = query.skip(skip).limit(limit);
        if (req.query.page) {
            const transactionCount = await TransactionRecord.countDocuments();
            if (skip >= transactionCount) next(new AppError("This Page does not exists",404))
        }
        const transactionRecord = await query.populate([
            {path: "user_id", select:'name userId profileImg userLevel status'},
            {path: "action_id", select:'name userId profileImg userLevel status'}
        ]);
        res.json(transactionRecord);
    }catch (e) {
        res.status(500).json({
            status:'error',
            message:process.env.NODE_ENV ==="production"? e.message: e.stack
        })
    }
})