const TransactionRecord = require('./transactionRecordModel')
const catchAsync = require('../utils/catchAsync')
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