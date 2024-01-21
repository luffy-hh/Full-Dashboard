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
        // Old Filtering
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
        function convertKeysAndValues(obj) {
            let newObj = {};
            for (let [key, value] of Object.entries(obj)) {
                //check if the value obj is object if not else work
                if (typeof value === 'object' && value !== null) {
                    // loop the value of Obj
                    for (let [innerKey, innerValue] of Object.entries(value)) {
                        let newKey = `$${innerKey}`;
                        let newValue;
                        if (newKey === '$in') {
                            // Check if innerValue has multiple values
                            newValue = innerValue.includes(',') ? innerValue.split(',') : [innerValue];
                        } else if (newKey === '$gt' || newKey === '$lt' || newKey === '$gte' || newKey === '$lte') {
                            //for > < >= <= this will work both for number and date string
                            // Check if value is a number or a date string
                            newValue = isNaN(innerValue) ? new Date(innerValue) : Number(innerValue);
                        }
                        // after changing assign in newObj
                        newObj[key] = { ...newObj[key], [newKey]: newValue };
                    }
                } else {
                    newObj[key] = value;
                }
            }
            return newObj;
        }

        // Convert original object
        let convertedObj = convertKeysAndValues(queryObj);

        // Convert to string and replace keys
        let queryStr = JSON.stringify(convertedObj);
        let query = TransactionRecord.find(JSON.parse(queryStr));

        // Get the total count of all records
        const totalCount = await TransactionRecord.countDocuments(query);

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
        res.json({
            total: totalCount,
            transactionRecord
        });
    }catch (e) {
        res.status(500).json({
            status:'error',
            message:process.env.NODE_ENV ==="production"? e.message: e.stack
        })
    }
})