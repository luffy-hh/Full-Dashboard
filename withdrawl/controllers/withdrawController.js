const BankAcc = require("../../bank/models/bankAccModels");
const Withdraw = require("../models/withdrawlModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const {promisify} = require("util");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");
const {createTransactionRecord} = require("../../transaction-record/transactionRecordController");
const MainUnit = require("../../mainUnit/models/mainUnitModel");


// Create With Draw
exports.createWithdraw = catchAsync(async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const currentUserId = decoded.id;
        const currentUserObj = await User.findById(currentUserId);
        const currentUserUplineId = currentUserObj.uplineId;
        const uplineUserObj = await User.findOne({userId: currentUserUplineId});
        const uplineObjId = uplineUserObj._id.toString();
        const reqBody = req.body;
        const currentTime = new Date();
        if (currentUserObj.unit < reqBody.amount) {
            res.status(404).json({
                status: "fail",
                message: "Your Amount is Lower Then Withdraw Amount",
            });
        }
        const insertObj = {
            fromId: currentUserId,
            toId: uplineObjId,
            bankNameId: reqBody.bankNameId,
            recAcc: reqBody.recAcc,
            recAccName: reqBody.recAccName,
            amount: reqBody.amount,
            action_time: currentTime,
        };

        const newWithdraw = await Withdraw.create(insertObj);
        const newWithdrawData = await Withdraw.findById(newWithdraw._id)
            .populate("fromId")
            .populate("toId")
            .populate("bankNameId");

        newWithdrawData.action_time = moment(newWithdrawData.action_time)
            .tz("Asia/Yangon")
            .format();

        const upDateUnit = currentUserObj.unit - reqBody.amount;
        currentUserObj.unit = upDateUnit;

        const withdrawUserObj = await User.findByIdAndUpdate(
            currentUserId,
            {
                unit: upDateUnit,
            },
            {new: true}
        );
        const transactionObj = {
            user_id :req.user.id,
            action_id: uplineObjId,
            before_amt: currentUserObj.unit,
            action_amt:reqBody.amount,
            after_amt:withdrawUserObj.unit,
            type: 'withdrawal-requested',
            status:'Out'
        }
         const newTransactionRecord = createTransactionRecord(transactionObj)

        res.status(201).json({
            status: "success",
            message: "Your Withdraw Is SuccessFul , Please wait",
            data: {
                newWithdrawData,
                withdrawUserObj,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
});

// Read All Withdraw
exports.getAllWithdraw = catchAsync(async (req, res) => {
    try {
        const getAllShwoWithdraw = await Withdraw.find()
            .populate("fromId")
            .populate("toId")
            .populate("bankNameId");

        getAllShwoWithdraw.action_time = moment(getAllShwoWithdraw.action_time)
            .tz("Asia/Yangon")
            .format();

        res.status(200).json({
            status: "Success",
            length: getAllShwoWithdraw.length,
            data: {
                getAllShwoWithdraw,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err,
        });
    }
});

exports.getAllWithdrawUpline = catchAsync(async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const getAllShwoWithdraw = await Withdraw.find({toId: userId})
            .populate("fromId")
            .populate("toId")
            .populate("bankNameId");

        getAllShwoWithdraw.action_time = moment(getAllShwoWithdraw.action_time)
            .tz("Asia/Yangon")
            .format();

        res.status(200).json({
            status: "Success",
            length: getAllShwoWithdraw.length,
            data: {
                getAllShwoWithdraw,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err,
        });
    }
});

exports.getAllWithdrawDownline = catchAsync(async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userId = decoded.id.toString();

        const getAllShwoWithdraw = await Withdraw.find({fromId: userId})
            .populate("fromId")
            .populate("toId")
            .populate("bankNameId");

        // Loop through each document to format action_time
        // getAllShwoWithdraw.forEach((withdraw) => {
        //   withdraw.action_time = moment(withdraw.action_time)
        //     .tz("Asia/Yangon")
        //     .format();
        // });

        res.status(200).json({
            status: "Success",
            length: getAllShwoWithdraw.length,
            data: {
                getAllShwoWithdraw,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message,
        });
    }
});

// Update Withdraw Status
exports.updateWithdarw = catchAsync(async (req, res) => {
    try {
        const reqBody = req.body;
        const currentTime = new Date();
        // const token = req.headers.authorization.split(" ")[1];
        // const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        const userId = req.user.id;
        const userObj = await User.findById(userId);
        const withdrawId = req.params.id;
        const withdrawal = await Withdraw.findById(withdrawId)
        if (reqBody.status === "Confirm") {
            const withdrawObj = await Withdraw.findByIdAndUpdate(
                withdrawId,
                {
                    action_time: currentTime,
                    status: "Confirm",
                },
                {
                    new: true,
                }
            );
            //const updateUnit = userObj.unit + reqBody.unit;
            const updateUser = await User.findByIdAndUpdate(
                withdrawal.toId,
                {
                    $inc: {
                        unit: reqBody.unit
                    },
                },
                {new: true}
            );
            const transactionObj = {
                user_id: withdrawObj.toId,
                action_id: withdrawObj.fromId,
                before_amt:userObj.unit,
                action_amt: withdrawObj.amount,
                after_amt: updateUser.unit,
                status: "In",
                type: "withdrawal-confirmed"
            }
            const newTransactionRecord = createTransactionRecord(transactionObj)
            res.status(200).json({
                status: "Success",
                data: {
                    withdrawObj,
                    updateUser,
                },
            });
        }
        if (reqBody.status === "Cancle") {
            const withdrawObj = await Withdraw.findByIdAndUpdate(
                withdrawId,
                {
                    action_time: currentTime,
                    status: "Cancle",
                },
                {
                    new: true,
                }
            );
            const user = await User.findById(withdrawal.fromId)
            //const updateUnit = userObj.unit + reqBody.unit;
            const updatedUser = await User.findByIdAndUpdate(
                withdrawal.fromId,
                {
                    $inc: {
                        unit: reqBody.unit
                    }
                },
                {new: true}
            );
            const transactionObj = {
                user_id: withdrawObj.fromId,
                action_id: withdrawObj.toId,
                before_amt:user.unit,
                action_amt: withdrawObj.amount,
                after_amt: updatedUser.unit,
                status: "In",
                type: "withdrawal-canceled-refunded",
            }
            const newTransactionRecord = createTransactionRecord(transactionObj)
            res.status(200).json({
                status: "Success",
                data: {
                    withdrawObj,
                    updatedUser,
                },
            });
        }
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err,
        });
    }
});

exports.updateWithDrawalFromAdmin = catchAsync(async (req, res, next) => {
    try {
        const reqBody = req.body;
        const currentTime = new Date();
        const withdrawalId = req.params.id;
        const mainUnit = await MainUnit.find();
        const withDrawal = await Withdraw.findById(withdrawalId);

        if (reqBody.status === "Confirm") {
            const withdrawalObj = await Withdraw.findByIdAndUpdate(
                withdrawalId,
                {
                    action_time: currentTime,
                    status: "Confirm",
                },
                {
                    new: true,
                }
            );

            const mainUnitId = mainUnit[0]._id;
            const mainUnitDocument = mainUnit[0]; // Assuming it's an array with one document
            const mainUnitObj = await MainUnit.findById(mainUnitId)
            // Check if mainUnitDocument is valid and has a numeric mainUnit
            if (
                mainUnitDocument &&
                !isNaN(mainUnitDocument.mainUnit) &&
                !isNaN(reqBody.unit)
            ) {
                const updateUnit = mainUnitDocument.mainUnit + reqBody.unit;
                const updateMainUnit = await MainUnit.findByIdAndUpdate(
                    mainUnitId,
                    {
                        $inc: {
                            mainUnit: reqBody.unit
                        },
                    },
                    {new: true}
                );
                const transactionObj ={
                    user_id: req.user.id,
                    action_id:withdrawalObj.fromId,
                    before_amt: mainUnitObj.mainUnit,
                    action_amt: reqBody.unit,
                    after_amt: updateMainUnit.mainUnit,
                    type: "withdrawal-confirm-from-admin",
                    status:'In',
                }
                const newTransactionRecord = createTransactionRecord(transactionObj)

                res.status(200).json({
                    status: "Success",
                    data: {
                        withdrawalObj,
                        updateMainUnit,
                    },
                });
            } else {
                throw new Error("Invalid mainUnit or reqBody.unit value");
            }
        }

        if (reqBody.status === "Cancle") {
            const depositObj = await Withdraw.findByIdAndUpdate(
                withdrawalId,
                {
                    action_time: currentTime,
                    status: "Cancle",
                },
                {
                    new: true,
                }
            );
            const oldUserObj = await User.findById(withDrawal.fromId)
            const updatedUser = await User.findByIdAndUpdate(
                withDrawal.fromId,
                {
                    $inc: {unit: reqBody.unit},
                },
                {new: true}
            );
            const transactionObj ={
                user_id: withDrawal.fromId,
                action_id:req.user.id,
                before_amt: oldUserObj.unit,
                action_amt: reqBody.unit,
                after_amt: updatedUser.unit,
                type: "withdrawal-canceled-refunded",
                status:'In',
            }
            const newTransactionRecord = createTransactionRecord(transactionObj)

            res.status(200).json({
                status: "Success",
                data: {
                    depositObj,
                    updatedUser
                },
            });
        } else {
            throw new Error("Invalid userObj.unit or reqBody.unit value");
        }
    } catch (e) {
        new AppError('Something went Wrong', 500)
    }
})