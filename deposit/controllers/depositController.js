const Deposit = require("../models/depositModels");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("../../users/userModels");
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
// Create Bank Type
exports.createDeposit = catchAsync(async (req, res) => {
  try {
    const reqBody = req.body;
    const options = {
      timeZone: "Asia/Yangon",
      timeZoneName: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const currentTime = new Date().toLocaleString("en-US", options);

    const token = req.headers.authorization.split(" ")[1];
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const fromId = decoded.id;
    const currentUserObj = await User.findById(fromId);
    const uplieId = currentUserObj.userId;
    const uplieObj = await User.findOne({ userId: uplieId });
    const toId = uplieObj._id.toString();

    const insertObj = {
      fromId,
      toId,
      date: currentTime,
      bankName_id: reqBody.bankName_id,
      bankAcc: reqBody.bankAcc,
      transferCode: reqBody.transferCode,
      amount: reqBody.amount,
      status: "panding",
      description: "deposit",
    };

    const newDeposit = await Deposit.create({ ...insertObj });

    const resObj = newDeposit
      .populate("fromId")
      .populate("toId")
      .populate("bankName_id");
    res.status(201).json({
      status: "success",
      data: {
        resObj,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
});

// Read All Deposit
exports.getDeposit = catchAsync(async (req, res) => {
  try {
    const query = Deposit.find();
    const allDeposit = await query;

    res.status(200).json({
      status: "Success",
      data: {
        allDeposit: allDeposit,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

// Update Bank Type name
exports.updateDepositStatus = catchAsync(async (req, res) => {
  try {
    const reqBody = req.body;
    if (reqBody.status === "confirm") {
      const updateDeposit = await Deposit.findOneAndUpdate(reqBody.id, {
        status: "confirm",
      });
      const toId = reqBody.toId;
      const toIdObj = await User.findById(toId);
      const minusAmount = toIdObj.unit - reqBody.amount;
      const toUpdateObj = await User.findByIdAndUpdate(
        toId,
        {
          amount: minusAmount,
        },
        { new: true }
      );
      const fromId = reqBody.toId;
      const fromIdObj = await User.findById(fromId);
      const plusAmount = fromIdObj.unit + reqBody.amount;
      const fromUpdateObj = await User.findByIdAndUpdate(
        toId,
        {
          amount: plusAmount,
        },
        { new: true }
      );

      res.status(200).json({
        status: "Success",
        data: {
          toUpdateObj,
          fromUpdateObj,
          updateDeposit,
        },
      });
    }
    if (reqBody.status === "cancle") {
      const updateDeposit = await Deposit.findOneAndUpdate(reqBody.id, {
        status: "cancle",
      });

      const fromId = reqBody.toId;
      const fromIdObj = await User.findById(fromId);
      res.status(200).json({
        status: "Cancle",
        data: {
          fromIdObj,
          updateDeposit,
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
