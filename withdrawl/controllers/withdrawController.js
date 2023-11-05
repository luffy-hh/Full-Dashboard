const BankAcc = require("../models/bankAccModels");
const Withdraw = require("../models/withdrawlModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const moment = require("moment-timezone");

// Create With Draw
exports.createWithdraw = catchAsync(async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentUserId = decoded.id;
    const currentUserObj = await User.findById(currentUserId);
    const currentUserUplineId = currentUserObj.uplineId;
    const uplineUserObj = await User.findOne({ uplineId: currentUserUplineId });
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
      { new: true }
    );

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
    const getAllShwoWithdraw = await Withdraw.find({ toId: userId })
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
    const userId = decoded.id;
    const getAllShwoWithdraw = await Withdraw.find({ fromId: userId })
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

// Update Withdraw Status
exports.updateWithdarw = catchAsync(async (req, res) => {
  try {
    const reqBody = req.body;
    const currentTime = new Date();
    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const userObj = await User.findById(userId);
    const withdrawId = req.params.id;
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
      const updateUnit = userObj.unit + reqBody.unit;
      const updateUser = await User.findByIdAndUpdate(
        userId,
        {
          unit: updateUnit,
        },
        { new: true }
      );
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
      const updateUnit = userObj.unit + reqBody.unit;
      const downlineUser = await User.findByIdAndUpdate(
        reqBody.downlineId,
        {
          unit: updateUnit,
        },
        { new: true }
      );
      res.status(200).json({
        status: "Success",
        data: {
          withdrawObj,
          downlineUser,
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
